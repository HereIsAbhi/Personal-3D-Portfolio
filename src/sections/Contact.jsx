// import { exp } from "three/webgpu"
import { useState } from "react"

import {useRef} from 'react'
import emailjs from '@emailjs/browser'

const Contact=()=>{ 
    const formRef = useRef(null);
 
    const [loading, setLoading] = useState(false);
    const[form,setForm] = useState({
        name:'',
        email:'',
        message:''
    });
    const handleChange = ({target:{name,value}}) => {
        setForm({
            ...form,
            [name]:value
        })
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        setLoading(true);

        try{
            await emailjs.send(
                'service_egcsx5p',
                'template_uty9mig',
                {from_name:form.name,
                to_name:'Abhi',
                from_email:form.email,
                to_email:'abhi.ak3002@gmail.com',
                message:form.message
                
                
            },
            'jc67lks2OO2Ru4ohR'
        )

            setLoading(false);
            alert('Message sent successfully');
            setForm({
                name:'',
                email:'',
                message:''
            });
         }
        catch(e){
            setLoading(false);
            alert('An error occurred, Please try again later');
    }
}

    return(
        <section className="c-space my-20" id="contact">
            <div className="relative min-h-screen flex items-center justify-center flex-col">
                <img src="/assets/terminal.png" alt="" className="absolute inset-0 min-h-screen" />
                <div className="contact-container">
                    <h3 className="head -text">Let's talk</h3>
                    <p className="text-lg text-white-600 mt-3">Whether u r looking to build a new website,improve your existing platform, or bring a unique project to life,I'm here to help.</p>

                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">
                                Full Name
                            </span>
                            <input type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="field-input" 
                            required
                            placeholder="Enter your name"   

                            />
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">
                                Email
                            </span>
                            <input type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="field-input" 
                            required
                            placeholder="Enter your email"   

                            />
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">
                               Your Message 
                            </span>
                            <textarea 
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            className="field-input" 
                            required
                            rows={5}
                            placeholder="Enter your msg"   

                            />
                        </label>
                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send'}
                            <img src="assets/arrow-up.png" className="field-btn_arrow" alt="" />
                        </button>


                    </form>
                </div>
            </div>
        </section>
    )
}
export default Contact;