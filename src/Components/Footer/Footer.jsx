import React from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  return <>
<footer class="footer bg-dark text-light py-2">
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <h3>E-commerce</h3>
                <p>This is a sample E-commerce. You can by any product from here.</p>
            </div>
            <div class="col-md-4">
                
            </div>
            <div class="col-md-4">
                <h3>Follow Us</h3>
                <ul class="list-inline ">
                    <li class="list-inline-item"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                    <li class="list-inline-item"><a href="#"><i class="fab fa-twitter"></i></a></li>
                    <li class="list-inline-item"><a href="#"><i class="fab fa-instagram"></i></a></li>
                    <li class="list-inline-item"><a href="#"><i class="fab fa-linkedin-in"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
</footer>  </>
}
