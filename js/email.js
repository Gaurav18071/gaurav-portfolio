/* ==========================================================
   WEB3FORMS CONTACT FORM
   ========================================================== */

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        submitBtn.disabled = true;

        submitBtn.innerHTML = `
            <i class="fas fa-spinner fa-spin"></i>
            Sending...
        `;

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                contactForm.reset();

                successModal.classList.add("show");

                submitBtn.innerHTML = `
                    <i class="fas fa-check"></i>
                    Sent Successfully
                `;

                setTimeout(() => {

                    submitBtn.disabled = false;

                    submitBtn.innerHTML = `
                        <span class="btn-text">
                            Send Message
                        </span>
                    `;

                }, 2000);

            }

            else{

                throw new Error(result.message);

            }

        }

        catch(error){

            console.error(error);

            submitBtn.disabled = false;

            submitBtn.innerHTML = `
                <i class="fas fa-triangle-exclamation"></i>
                Failed
            `;

            setTimeout(()=>{

                submitBtn.innerHTML = `
                    <span class="btn-text">
                        Send Message
                    </span>
                `;

            },2000);

            alert("Unable to send message. Please try again.");

        }

    });

}


/* ==========================================================
   CLOSE MODAL BUTTON
   ========================================================== */

if(closeModal){

    closeModal.addEventListener("click",()=>{

        successModal.classList.remove("show");

    });

}


/* ==========================================================
   CLICK OUTSIDE
   ========================================================== */

if(successModal){

    successModal.addEventListener("click",(e)=>{

        if(e.target===successModal){

            successModal.classList.remove("show");

        }

    });

}


/* ==========================================================
   ESC KEY
   ========================================================== */

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        successModal.classList.remove("show");

    }

});