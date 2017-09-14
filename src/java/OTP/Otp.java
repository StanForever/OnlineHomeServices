/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package OTP;

import java.util.Random;

/**
 *
 * @author shempereira
 */
public class Otp {
    
    public int generateOtp()
    {
        Random rnd = new Random();
        int n = 100000 + rnd.nextInt(900000);
        return n;
    }
    
}
