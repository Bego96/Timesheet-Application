public class alertByEmail implements Schedulable {
    public void execute(SchedulableContext SC) {

        List<User> recipientEmails = [SELECT Email FROM User];
        
        String templateId = '00X07000000tuwJ'; 

        sendEmailWithTemplate(recipientEmails, templateId);
    }


    public static void sendEmailWithTemplate(List<User> recipientEmails, String templateId) {
    // Create a list to hold all email messages
        List<Messaging.SingleEmailMessage> emailMessages = new List<Messaging.SingleEmailMessage>();

        // Iterate through recipientEmails and create email messages
        for (User user : recipientEmails) {
            // Create an EmailMessage object for each recipient
            Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();

            // Set the target recipient email address
            email.setToAddresses(new List<String>{user.Email});

            // Set the email template ID
            email.setTemplateId(templateId);

           // Set saveAsActivity to false for emails sent to Users
            email.setSaveAsActivity(false);

            // Set the targetObjectId (record ID to merge data into the template)
            email.setTargetObjectId(user.Id);

            // Add the email message to the list
            emailMessages.add(email);
        }

        // Send all email messages in bulk
        Messaging.SendEmailResult[] results = Messaging.sendEmail(emailMessages);

        // Handle the results as needed
        for (Messaging.SendEmailResult result : results) {
            if (result.isSuccess()) {
                System.debug('Email sent successfully');
                sendEmailToSelf('Success sending email', 'Email sent successfuly to user');
            } else {
                System.debug('Email sending failed. Error: ' + result.getErrors()[0].getMessage());
                sendEmailToSelf('Failure sending email', 'Email wasnt sent successfuly');
            }
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