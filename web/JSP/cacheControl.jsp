<%-- 
    Document   : cacheControl
    Created on : 28 Oct, 2016, 1:21:58 PM
    Author     : shempereira
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    response.setHeader("Cache-Control", "no-cache");
    response.setHeader("Cache-Control", "no-store");
    response.setDateHeader("Expires", 0);
    response.setHeader("Pragma", "no-cache");
    %>
