// Form submission handler from Github user dwyl.
// https://github.com/dwyl/learn-to-send-email-via-google-script-html-no-server/
// Modified by me to handle empty fields and custom events after form submission.
"use strict";

(function() {
    function validEmail(email) {
      var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
      return re.test(email);
    }
  
    function validateHuman(honeypot) {
      if (honeypot) {  //if hidden form filled up
        // console.log("Robot Detected!");
        return true;
      } else {
        // console.log("Welcome Human!");
      }
    }
  
    // get all data in form and return object
    function getFormData(form) {
      var elements = form.elements;
  
      var fields = Object.keys(elements).filter(function(k) {
            return (elements[k].name !== "msg-title");
      }).map(function(k) {
        if(elements[k].name !== undefined) {
          return elements[k].name;
        // special case for Edge's html collection
        }else if(elements[k].length > 0){
          return elements[k].item(0).name;
        }
      }).filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });
  
      var formData = {};
      fields.forEach(function(name){
        var element = elements[name];
        
        // singular form elements just have one value
        formData[name] = element.value;
  
        // when our element has multiple items, get their values
        if (element.length) {
          var data = [];
          for (var i = 0; i < element.length; i++) {
            var item = element.item(i);
            if (item.checked || item.selected) {
              data.push(item.value);
            }
          }
          formData[name] = data.join(', ');
        }
      });
  
      // add form-specific values into the data
      formData.formDataNameOrder = JSON.stringify(fields);
      formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
      formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
  
      // console.log(formData);
      return formData;
    }
  
    function handleFormSubmit(event) {  // handles form submit without any jquery
      event.preventDefault();           // we are submitting via xhr below
      var form = event.target;
      var data = getFormData(form);         // get the values submitted in the form
  
      if (validateHuman(data.title)) {  //if form honeypot is filled, form will not be submitted
        return false;
      }

      if (!data.name || !data.message || !data.email) { // if form elements are empty
          // console.log("Not all fields are filled")
          return false;
      }
  
      if( data.email && !validEmail(data.email) ) {   // if email is not valid show error
        var invalidEmail = form.querySelector(".email-invalid");
        if (invalidEmail) {
          invalidEmail.style.display = "block";
          return false;
        }
      } else {
        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            // console.log(xhr.status, xhr.statusText);
            // console.log(xhr.responseText);
            form.reset();
            document.querySelectorAll('.gform>.form-text-field').forEach((field) => field.classList.remove('filled'));
            var thankYouMessage = document.querySelector(".thankyou_message");
            if (thankYouMessage) {
              thankYouMessage.style.opacity = 1;
              setTimeout(() => {
                thankYouMessage.style.opacity = 0;
              }, 5000);
            }
            return;
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
      }
    }
    
    function loaded() {
      // console.log("Contact form submission handler loaded successfully.");
      // bind to the submit event of our form
      var forms = document.querySelectorAll("form.gform");
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener("submit", handleFormSubmit, false);
      }
    }
    document.addEventListener("DOMContentLoaded", loaded, false);
  
    function disableAllButtons(form) {
      var buttons = form.querySelectorAll("button");
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].disabled = true;
      }
    }
})();