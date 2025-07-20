// Backend.java

import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Backend extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
        throws ServletException, IOException {
        
        // Get parameters (example: name, dob, etc.)
        String name = request.getParameter("name");
        String dob = request.getParameter("dob");
        // Add other parameters as needed

        // Example: Save data to file or process
        PrintWriter out = response.getWriter();
        response.setContentType("text/html");
        out.println("<html><body>");
        out.println("<h3>Birth Report Saved!</h3>");
        out.println("Name: " + name + "<br>");
        out.println("Date of Birth: " + dob + "<br>");
        out.println("</body></html>");
        out.close();
    }
}
