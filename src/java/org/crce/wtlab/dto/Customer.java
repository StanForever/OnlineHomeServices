/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package org.crce.wtlab.dto;

import java.util.Date;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author shempereira
 */
public class Customer {
    
    private int custId;
    private String firstName;
    private String lastName;
    private String email;
    private  long phone;
    private String city;
    private String username;
    private String password;
    private String emailVerificationHash;
    private String status="inactive";
    private int otp;
    private Date otpTimestamp;
    private int balance=0;
    
    

    public int getCustId() {
        return custId;
    }

    public void setCustId(int custId) {
        this.custId = custId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public long getPhone() {
        return phone;
    }

    public void setPhone(long phone) {
        this.phone = phone;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmailVerificationHash() {
        return emailVerificationHash;
    }

    public void setEmailVerificationHash(String emailVerificationHash) {
        this.emailVerificationHash = emailVerificationHash;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getOtp() {
        return otp;
    }

    public void setOtp(int otp) {
        this.otp = otp;
    }

    public Date getOtpTimestamp() {
        return otpTimestamp;
    }

    public void setOtpTimestamp(Date otpTimestamp) {
        this.otpTimestamp = otpTimestamp;
    }

    public int getBalance() {
        return balance;
    }

    public void setBalance(int balance) {
        this.balance = balance;
    }
    
    public static Customer populateData(HttpServletRequest request, HttpServletResponse response)
    {
        Customer c =new Customer();
           c.setFirstName(request.getParameter("firstName"));
           c.setLastName(request.getParameter("lastName"));
           c.setPhone(Long.parseLong(request.getParameter("phone"))); 
           c.setEmail(request.getParameter("email"));
           c.setCity(request.getParameter("city"));
           c.setUsername(request.getParameter("username"));
           c.setPassword(request.getParameter("password"));
           return c;
    }
    
}
