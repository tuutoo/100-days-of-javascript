emailjs.init("bJUzp1r8YsvBwefef"); // Replace with your EmailJS User ID

const sendBtn = document.querySelector('.send-btn');
const result = document.querySelector('.result');

sendBtn.addEventListener('click', sendEmail);

function sendEmail() {
  // Get the form data
  const to = document.getElementById("to").value;
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value;

  // Send the email using EmailJS
  emailjs.send("service_ktvm8up", "template_f73y72l", {
    to_email: to,
    subject: subject,
    message: message
  })
    .then(function () {
      result.innerHTML = "Email sent successfully!";
      result.style.opacity = 1;
    }, function (error) {
      result.innerHTML = "Email sending failed!";
      result.style.opacity = 1;
    });
}