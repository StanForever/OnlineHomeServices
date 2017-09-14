/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.crce.wtlab.impl;

import Encryption.HashGenerator;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.crce.wtlab.dao.CustomerDao;
import org.crce.wtlab.dto.Customer;
import org.crce.wtlab.utils.Datasource;
import Verification.VerificationHash;
import java.util.Objects;
import javax.sql.DataSource;

/**
 *
 * @author shempereira
 */
public class CustomerDaoImpl implements CustomerDao {
    
    Connection connection;
    PreparedStatement preparedStatement;
    Statement statement;
    ResultSet rs;

    @Override
    public void createAccount(Customer c) {
        try {
                connection = Datasource.getConnection();
            } catch (ClassNotFoundException ex) {
                Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
            } catch (SQLException ex) {
                Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
       VerificationHash verify=new VerificationHash();
       
       String ver=verify.generateVerificationHash(c.getEmail()+c.getFirstName());
       c.setEmailVerificationHash(ver);
                
       HashGenerator hash=new HashGenerator(c.getPassword());
      c.setPassword(hash.generateHash()); 
      
      
        String sql="insert into Customer (First_name,Last_name,Phone,Email,City,Username,Password,Email_verification_hash,Status) Values(?,?,?,?,?,?,?,?,?);";
        try{
            preparedStatement =connection.prepareStatement(sql);
            preparedStatement.setString(1, c.getFirstName());
            preparedStatement.setString(2, c.getLastName());
            preparedStatement.setLong(3, c.getPhone());
            preparedStatement.setString(4,c.getEmail());
            preparedStatement.setString(5,c.getCity());
            preparedStatement.setString(6,c.getUsername());
            preparedStatement.setString(7, c.getPassword());
            preparedStatement.setString(8, c.getEmailVerificationHash());
            preparedStatement.setString(9, c.getStatus());
            
            
             int count = preparedStatement.executeUpdate();
                 //STEP 4: FIRE QUERY ON DB
                 if(count>0)
                {
                    System.out.println("Successfully Inserted");
                }else{
                    System.out.println("insertion failed");
                }
                 // STEP 5: PROCESS RESULT
                 
                 
            
            
        }
        catch (SQLException ex) {
                Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
       
    }

   /* @Override
    public void verifyCustomer(CustomerNew c) {
        
         try {
            connection= DataSource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         
         
         String sql="select * from Customer where Email=?";
         try{
             preparedStatement=connection.prepareStatement(sql);
             preparedStatement.setString(1, c.getEmail());
            rs= preparedStatement.executeQuery();
            String hash=null;
            if(rs.next())
            {
            hash=rs.getString(5);
            System.out.println(c.getEmail_verification_hash());
            System.out.println(hash);
            }
            System.err.println(c.getEmail_verification_hash().equals(hash));
            
            if(c.getEmail_verification_hash().equals(hash))
                System.out.println("right");
            else
                System.out.println("wrong");
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         
        
    }

    @Override
    public void changeOtp(CustomerNew c) {
        try {
            connection= DataSource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        String sql="update Customer set cid=? where name='shem'";
         try{
             preparedStatement=connection.prepareStatement(sql);
             preparedStatement.setInt(1, c.getCid());
             int count = preparedStatement.executeUpdate();
                 //STEP 4: FIRE QUERY ON DB
                 if(count>0)
                {
                    System.out.println("Successfully Inserted");
                }else{
                    System.out.println("insertion failed");
                }
           
            
      
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
                
        
        
        
    }

    @Override
    public void checkOtp(CustomerNew c) {
        try {
            connection= DataSource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        String sql="select * from Customer where name='shem'";
         try{
             preparedStatement=connection.prepareStatement(sql);
             rs=preparedStatement.executeQuery();
             rs.next();
             int otp=rs.getInt(1);
             System.out.println("passed value: "+c.getCid());
             System.out.println("database: "+otp);
             
             
           
            
      
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
    }*/

    @Override
    public void verifyCustomer(Customer c) {
        
         try {
            connection= Datasource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         
         
         String sql="select * from Customer where Email=? and Username=?";
         try{
             preparedStatement=connection.prepareStatement(sql);
             preparedStatement.setString(1, c.getEmail());
             preparedStatement.setString(2, c.getUsername());
            rs= preparedStatement.executeQuery();
            String hash=null;
            String value=null;
            if(rs.next())
            {
                hash=rs.getString(9);
                value=c.getEmailVerificationHash();
                hash= hash.replaceAll("\\s+","");
             value=value.replaceAll("\\s+","");
                 
              
                
            }
            if(hash.equals(value))
            {
                   String dbsql="update Customer set Status='active' where Email=? and Username=?";
                   try{
                        preparedStatement=connection.prepareStatement(dbsql);
                        preparedStatement.setString(1, c.getEmail());
                        preparedStatement.setString(2, c.getUsername());
                      int count=   preparedStatement.executeUpdate();
                        if(count>0)
                        System.out.println("Customer active");
                   }
                    catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
                   
            }
            }
            else
                System.out.println("Customer verification error");
           
          
          
           
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         
        
    }

    @Override
    public boolean checkLogin(Customer c) {
       try {
            connection= Datasource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         boolean flag=false;
         String pass=c.getPassword();
         HashGenerator hashgen=new HashGenerator(pass);
         String encrip_pass=hashgen.generateHash();
         String dbpass=null;
         String sql="select * from Customer where Username=? and Status='active'";
         try{
             preparedStatement=connection.prepareStatement(sql);
             preparedStatement.setString(1, c.getUsername());
            rs= preparedStatement.executeQuery();
           
            if(rs.next())
            {
                dbpass= rs.getString(8);
                if(encrip_pass.equals(dbpass))
                    System.out.println("login verified");
                else
                    System.out.println("login not verified");
                    
                    
           
            }
            System.out.println("out of rs next");
            System.out.println(encrip_pass);
            System.out.println(dbpass);
           
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         System.out.println("out of catch");
         System.out.println(encrip_pass);
            System.out.println(dbpass);
            encrip_pass=encrip_pass.replaceAll("\\s+","");
            dbpass=dbpass.replaceAll("\\s+","");
         if(flag=encrip_pass.equals(dbpass))
                    System.out.println("login verified");
                else
                    System.out.println("login not verified");
         boolean sure= dbpass.length()==encrip_pass.length();
         System.out.println(sure);
         System.out.println(dbpass.length());
         System.out.println(encrip_pass.length());
         return flag;
         
    }
    
    @Override
    public void changeOtp(Customer c) {
        try {
            connection= Datasource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        String sql="update Customer set Otp=? where Email=?";
         try{
             preparedStatement=connection.prepareStatement(sql);
             preparedStatement.setInt(1, c.getOtp());
             preparedStatement.setString(2, c.getEmail());
             int count = preparedStatement.executeUpdate();
                 //STEP 4: FIRE QUERY ON DB
                 if(count>0)
                {
                    System.out.println("Successfully changed otp");
                }else{
                    System.out.println("otp change  failed");
                }
           
            
      
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
                
        
        
        
    }

    @Override
    public void changePassword(Customer c) {
        
         try {
            connection= Datasource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         HashGenerator hash=new HashGenerator(c.getPassword());
         System.out.println(c.getPassword());
      c.setPassword(hash.generateHash());
         String sql="update Customer set Password=? where Email='shempereira44@gmail.com'";
         try{
             preparedStatement=connection.prepareStatement(sql);
             preparedStatement.setString(1, c.getPassword());
            // preparedStatement.setString(2, c.getEmail());
             int count = preparedStatement.executeUpdate();
                 //STEP 4: FIRE QUERY ON DB
                 if(count>0)
                {
                    System.out.println("Successfully changed password");
                }else{
                    System.out.println("password change  failed");
                }
           
            
      
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
                
       
    }

    @Override
    public boolean checkOtp(Customer c) {
       try {
            connection= Datasource.getConnection();
        } catch (ClassNotFoundException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        } catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        int otp=0;
        String sql="select * from Customer where Email='shempereira44@gmail.com'";
         try{
             preparedStatement=connection.prepareStatement(sql);
            // preparedStatement.setString(1, c.getEmail());
             rs=preparedStatement.executeQuery();
             if(rs.next())
             {
                 otp= rs.getInt(11);
             }
            
             
           
            
      
         }
         catch (SQLException ex) {
            Logger.getLogger(CustomerDaoImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
         System.out.println(otp);
         System.out.println(c.getOtp());
         if(otp ==c.getOtp() )
             return true;
         else
             return false;
         
    }

   
            
      
         }
         
    
    


