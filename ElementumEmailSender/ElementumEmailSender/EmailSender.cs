using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;

namespace ElementumEmailSender
{
    [ServiceContract]
    public interface IEmailSender
    {
        [OperationContract]
        [WebInvoke(
            Method = "POST",
            BodyStyle = WebMessageBodyStyle.Wrapped,
            ResponseFormat = WebMessageFormat.Json,
            RequestFormat = WebMessageFormat.Json,
            UriTemplate = "sendemail")]
        string SendEmail(ElementumMessage emailInfo);
    }

    [DataContract(Name = "ElementumMessage")]
    public class ElementumMessage
    {
        string toAddress = "";
        string subject = "";
        string htmlContent = "";

        [DataMember]
        public string ToAddress
        {
            get { return toAddress; }
            set { toAddress = value; }
        }

        [DataMember]
        public string Subject
        {
            get { return subject; }
            set { subject = value; }
        }

        [DataMember]
        public string HtmlContent
        {
            get { return htmlContent; }
            set { htmlContent = value; }
        }
    }
}
