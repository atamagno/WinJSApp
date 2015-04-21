using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace ElementumEmailSender
{
    public class EmailSender : IEmailSender
    {
        public string SendEmail(ElementumMessage emailInfo)
        {
            MailMessage message = new MailMessage("agusto.tamagno@gmail.com", emailInfo.ToAddress);
            message.Subject = emailInfo.Subject;
            message.Body = emailInfo.HtmlContent;
            message.IsBodyHtml = true;
            
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Host = "smtp.gmail.com";
            client.EnableSsl = true;
            client.Credentials = new NetworkCredential("agusto.tamagno@gmail.com", "******"); // agregar password

            try
            {
                client.Send(message);
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }

            return "success";
        }
    }
}
