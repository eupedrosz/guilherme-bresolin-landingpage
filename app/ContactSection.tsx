'use client';

import { SubmitEvent, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const contactEmail = 'contatobresolin109@gmail.com';

export default function ContactSection() {
  const [status, setStatus] = useState('');

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const getText = (field: string, fallback = '') => {
      const value = form.get(field);
      return typeof value === 'string' ? value.trim() : fallback;
    };
    const name = getText('name');
    const senderEmail = getText('email');
    const subject = getText('subject', 'Contato pelo site');
    const message = getText('message');
    const body = `Nome: ${name}\nE-mail: ${senderEmail}\n\n${message}`;

    setStatus('Abrindo seu aplicativo de e-mail…');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="contact" id="contato" aria-labelledby="contact-title">
      <div className="contact__intro">
        <p className="contact__eyebrow">Fale conosco</p>
        <h2 className="contact__title" id="contact-title">
          <span className="contact__title-line">Entre em</span><br />Contato<span className="contact__title-dot">.</span>
        </h2>
        <p className="contact__copy">
          Para propostas, parcerias e informações, envie uma mensagem pelo formulário ou fale diretamente por e-mail.
        </p>
        <a className="contact__email" href={`mailto:${contactEmail}`}>
          {contactEmail}
        </a>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form__row">
          <label className="contact-form__field">
            <span>Nome</span>
            <input type="text" name="name" autoComplete="name" placeholder="Seu nome" maxLength={100} required />
          </label>

          <label className="contact-form__field">
            <span>E-mail</span>
            <input type="email" name="email" autoComplete="email" placeholder="voce@email.com" maxLength={254} required />
          </label>
        </div>

        <label className="contact-form__field">
          <span>Assunto</span>
          <input type="text" name="subject" placeholder="Como podemos ajudar?" maxLength={150} required />
        </label>

        <label className="contact-form__field">
          <span>Mensagem</span>
          <textarea name="message" rows={6} placeholder="Escreva sua mensagem aqui…" maxLength={2000} required />
        </label>

        <button className="contact-form__submit" type="submit">
          <span>Enviar mensagem</span>
          <span className="contact-form__arrow" aria-hidden="true">
            <ArrowRight strokeWidth={2.4} />
          </span>
        </button>

        <p className="contact-form__status" aria-live="polite">{status}</p>
      </form>
    </section>
  );
}
