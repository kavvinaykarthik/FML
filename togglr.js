/* Email validation */
let upload = document.getElementById('upload');

upload.addEventListener('change', () => {
  let fr = new FileReader();

  fr.readAsText(upload.files[0]);

  fr.onload = function() {
    let a = fr.result.split(/\r?\n|\n/).map(e => {
      return e.split(',');
    });
    let valNo = 0;
    let invalNo = 0;
    let valMail = [];
    let invalMail = [];

    a.forEach(e => {
      let em = String(e);
      let m = e.map(e => {
        return `<td>${e}</td>`;
      });

      let newe = document.createElement("tr");
      newe.innerHTML = m;

      if (em != "") {
        if (em.includes("@") && (em.charAt(em.length - 4) == '.' || em.charAt(em.length - 3) == '.')) {
          document.querySelector("table#val").appendChild(newe);
          valMail.push(em);
          valNo++;
        } else {
          document.querySelector("table#inval").appendChild(newe);
          invalMail.push(em);
          invalNo++;
        }
      }
    });

    document.querySelector("#valCount").innerHTML = valNo;
    document.querySelector("#invalCount").innerHTML = invalNo;
  };
});



/*-----------Posting Emails--------------*/

(function(){
  emailjs.init("lgR2ig462WuyUPqgw"); // replace with your actual user ID
})();
function sendEmail(){
  alert("Mails Sent!!");
  for (var j = 0; j < valMail.length; j++) {
    var templateParams = {
      to_name: valMail[j],
      from_name: document.getElementById("mailid").value,
      message: document.getElementById("message").value,
      subject : document.getElementById("body").value
      
    };
    
    emailjs.send("service_tgawlbo","template_j1t8w9h", templateParams,"lgR2ig462WuyUPqgw")
      .then(function(response) {
        console.log("SUCCESS", response);
      }, function(error) {
        console.log("FAILED", error);
      });
  }
}