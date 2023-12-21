public class alertByEmail implements Schedulable {
    public void execute(SchedulableContext SC) {

        List<Contact> recipientEmails = [SELECT Email FROM Contact];
        
        String templateId = '00X07000000tuwJ'; // Replace with your actual email template ID

        sendEmailWithTemplate(recipientEmails, templateId);
    }


    public static void sendEmailWithTemplate(List<Contact> recipientEmails, String templateId) {
        // Create an EmailMessage object
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

        // Set the target recipient email addresses
        List<String> toAddresses = new List<String>();
        for (Contact contact : recipientEmails) {
            toAddresses.add(contact.Email);
        }
        email.setToAddresses(toAddresses);

        // Set the email template ID
        email.setTemplateId(templateId);

        // Send the email
        Messaging.SendEmailResult[] result = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});

        // Check for success or failure
        if (result[0].isSuccess()) {
            System.debug('Email sent successfully');
            sendEmailToSelf('Success', 'Your apex scheduled email user notification worked successfuly.');
        } else {
            System.debug('Email scheduled sending failed. Error: ' + result[0].getErrors()[0].getMessage());
            sendEmailToSelf('Emailed sending failed', 'Your apex scheduled email user notification failed.');
        }
    }

    private static void sendEmailToSelf(String subject, String body) {
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(new String[]{'ismar.begic@empirica.edu.ba'});
        email.setSubject(subject + ' Notification');
        email.setHtmlBody(body);
        
        // Send the email
        Messaging.SendEmailResult[] result = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});

        // Check for success or failure
        if (result[0].isSuccess()) {
            System.debug('Self-notification email sent successfully');
        } else {
            System.debug('Self-notification email sending failed. Error: ' + result[0].getErrors()[0].getMessage());
        }
    }
}



