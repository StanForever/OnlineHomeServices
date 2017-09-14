/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Verification;
import java.util.*;
import Encryption.HashGenerator;
/**
 *
 * @author shempereira
 */
public class VerificationHash {
    
    public String generateVerificationHash(String email)
    {
        Date date=new Date();
    
        HashGenerator hash=new HashGenerator(email+date.toString());
       return  hash.generateHash();
    }    
    
}