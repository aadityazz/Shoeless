import React, {useState} from 'react';
import { AiFillInstagram, AiOutlineTwitter} from 'react-icons/ai';
import {client} from "../lib/client";
// import {client} from 'lib/client';
const date = new Date().getFullYear();

const Footer = () => {

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const { username, email, message } = formData;

    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = () => {
        setLoading(true);

        const contact = {
            _type: 'contact',
            name: formData.username,
            email: formData.email,
            message: formData.message,
        };

        client.create(contact)
            .then(() => {
                setLoading(false);
                setIsFormSubmitted(true);
            })
            .catch((err) => console.log(err));
    };


    return (
    <div className="footer-container">
        <div className="social-media">
            <p>{date} Shoeless</p>
            <p className="icons">
                <AiFillInstagram />
                <AiOutlineTwitter />
            </p>
            <p style={{paddingTop:"20px"}}>Write your feedback down below</p>
        </div>
        <div className="footer-form">
            {!isFormSubmitted ? (
                <form>
                    <ul className="form-style-1">
                        <li>
                            <input type="text" name="username" value={username} onChange={handleChangeInput} className="field-divided" placeholder="Name" onChange={handleChangeInput}/></li>
                        <li>
                            <input type="email" value={email} onChange={handleChangeInput} placeholder="Email" className="field-long" onChange={handleChangeInput}/>
                        </li>
                        <li>
                            <textarea
                                placeholder="Message"
                                className="field-long field-textarea"
                                value = {message}
                                name="message"
                                onChange={handleChangeInput}
                                />
                        </li>
                        <li>
                            <button type="button" value="Submit"
                                    onClick={handleSubmit}>{!loading ? 'Send Message' : 'Sending...'}</button>
                        </li>
                    </ul>
                </form>
            ) : (
                <div>
                    <h3 className="head-text">
                        Feedback is submitted, Thank you for getting in touch!
                    </h3>
                </div>
            )}
        </div>

    </div>
  )
}

export default Footer
