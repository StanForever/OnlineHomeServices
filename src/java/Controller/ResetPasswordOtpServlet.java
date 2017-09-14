/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import Email.SendMail;
import OTP.Otp;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.crce.wtlab.dto.Customer;
import org.crce.wtlab.impl.CustomerDaoImpl;

/**
 *
 * @author shempereira
 */
public class ResetPasswordOtpServlet extends HttpServlet{
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String email=request.getParameter("email");
            Otp otp=new Otp();
            int userOtp=otp.generateOtp();
            Customer c=new Customer();
            c.setOtp(userOtp);
            c.setEmail(email);
            CustomerDaoImpl cdao=new CustomerDaoImpl();
            cdao.changeOtp(c);
            
            String to=email;
            String subject = "houseJoy";
        String message ="OTP : "+c.getOtp()+"\n"+"http://localhost:8080/OnlineHomeServices/JSP/Reset_password.jsp?email="+email;
       //
        
        String user = "lizellepereiraida@gmail.com";
        String pass ="9920379936lp";
        SendMail.send(to,subject, message, user, pass);
            
            
            
            
            
            
            
           
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

    
}
