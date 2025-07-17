function Footer() {
    return (
        <footer className="footer">
            <p>
                &copy; {new Date().getFullYear()} Bhawani Shankar Maru. All rights reserved.
            </p>
            <p>
                Connect with me on{" "}
                <a href="https://github.com/BHAWANISHANKARMARU" target="_blank" rel="noopener noreferrer">
                    GitHub
                </a>{" "}
                |{" "}
                <a href="https://www.linkedin.com/in/bhawani-shankar-maru-0859972ba" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                </a>{" "}
                |{" "}
                <a href="https://www.instagram.com/bhawanis._ru/" target="_blank" rel="noopener noreferrer">
                    Instagram
                </a>{" "}
                |{" "}
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=bhawanishankarmaru2005@gmail.com" target="_blank" rel="noopener noreferrer">
                    Email
                </a>


            </p>
        </footer>
    );
}

export default Footer