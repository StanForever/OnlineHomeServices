/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.crce.wtlab.dao;

import org.crce.wtlab.dto.Customer;

/**
 *
 * @author shempereira
 */
public interface CustomerDao {
    public void createAccount(Customer c);
    public void verifyCustomer(Customer c);
    public boolean checkLogin(Customer c);
    public void changeOtp(Customer c);
    public void changePassword(Customer c);
    public boolean checkOtp(Customer c);
    
}
