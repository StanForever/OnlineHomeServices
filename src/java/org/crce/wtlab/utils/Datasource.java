/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.crce.wtlab.utils;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author 7411
 */
public class Datasource {
    private static Connection con;
    public static Connection getConnection() throws ClassNotFoundException, SQLException
    {  //step 1: load database driver
        Class.forName("org.postgresql.Driver");
         //step2: get connection to the database
        con = DriverManager.getConnection("jdbc:postgresql://localhost:5432/postgres", "postgres", "sshsbwm50");
       
        return con;
    }
    
    
}
