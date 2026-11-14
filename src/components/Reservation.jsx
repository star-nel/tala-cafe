import { useState } from 'react'
import useReveal from '../hooks/useReveal.js'
import './Reservation.css'

const initialValues = { name: '', email: '', phone: '', date: '', time: '', guests: '2', notes: '' }

function getToday() {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
}

function validate(values) {
  const errors = {}
  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) errors.email = 'Please enter your email.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.'
  if (!values.phone.trim()) errors.phone = 'Please enter your phone number.'
  if (!values.date) errors.date = 'Please choose a date.'
  else if (values.date < getToday()) errors.date = 'Choose today or a future date.'
  if (!values.time) errors.time = 'Please choose a time.'
  const guests = Number(values.guests)
  if (!Number.isInteger(guests) || guests < 1 || guests > 12) errors.guests = 'Choose between 1 and 12 guests.'
  return errors
}

export default function Reservation() {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [confirmed, setConfirmed] = useState(false)
  const [ref, visible] = useReveal()
  const today = getToday()

  const change = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: '' }))
  }

  const submit = (event) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      document.getElementById(Object.keys(nextErrors)[0])?.focus()
      return
    }
    // Connect a booking service or backend here when one is available.
    setConfirmed(true)
  }

  return (
    <section className="reservation-section section-pad" id="reserve" aria-labelledby="reservation-title">
      <div className="content-width">
        <div ref={ref} className={`reservation-layout reveal${visible ? ' is-visible' : ''}`}>
          <div className="reservation-intro"><p className="eyebrow"><span /> Your table is waiting</p><h2 id="reservation-title">Let's make<br />a <em>moment.</em></h2><p>Whether it's a quiet coffee or a table full of friends, we'd love to have you.</p><div className="reservation-hours"><span>Find us</span><strong>Makati City<br />Metro Manila, Philippines</strong><small>Every day · 8am–10pm</small></div></div>
          <div className="reservation-panel">
            {confirmed ? (
              <div className="booking-success" role="status">
                <span className="success-icon" aria-hidden="true">✓</span><p className="eyebrow">Saved just for you</p><h3>You're on<br /><em>the list.</em></h3>
                <p>Thanks, {values.name}. We have your request for {values.guests} {Number(values.guests) === 1 ? 'guest' : 'guests'} on {values.date} at {values.time}. A confirmation would be sent to {values.email} once online bookings are connected.</p>
                <button className="text-link" type="button" onClick={() => { setValues(initialValues); setErrors({}); setConfirmed(false) }}>Make another booking <span aria-hidden="true">↗</span></button>
              </div>
            ) : (
              <form className="reservation-form" onSubmit={submit} noValidate>
                <div className="form-heading"><span>01 — Make it yours</span><p>Fields marked <b>*</b> are required</p></div>
                <div className="form-grid">
                  <label className="field" htmlFor="name">Your name <b>*</b><input id="name" name="name" autoComplete="name" value={values.name} onChange={change} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} />{errors.name && <span className="field-error" id="name-error">{errors.name}</span>}</label>
                  <label className="field" htmlFor="email">Email address <b>*</b><input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={change} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} />{errors.email && <span className="field-error" id="email-error">{errors.email}</span>}</label>
                  <label className="field" htmlFor="phone">Phone number <b>*</b><input id="phone" name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={change} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} />{errors.phone && <span className="field-error" id="phone-error">{errors.phone}</span>}</label>
                  <label className="field" htmlFor="date">Date <b>*</b><input id="date" name="date" type="date" min={today} value={values.date} onChange={change} aria-invalid={Boolean(errors.date)} aria-describedby={errors.date ? 'date-error' : undefined} />{errors.date && <span className="field-error" id="date-error">{errors.date}</span>}</label>
                  <label className="field" htmlFor="time">Time <b>*</b><select id="time" name="time" value={values.time} onChange={change} aria-invalid={Boolean(errors.time)} aria-describedby={errors.time ? 'time-error' : undefined}><option value="">Choose a time</option>{['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM'].map((time) => <option key={time} value={time}>{time}</option>)}</select>{errors.time && <span className="field-error" id="time-error">{errors.time}</span>}</label>
                  <label className="field" htmlFor="guests">Guests <b>*</b><select id="guests" name="guests" value={values.guests} onChange={change} aria-invalid={Boolean(errors.guests)} aria-describedby={errors.guests ? 'guests-error' : undefined}>{Array.from({ length: 12 }, (_, guest) => <option key={guest + 1} value={guest + 1}>{guest + 1} {guest === 0 ? 'guest' : 'guests'}</option>)}</select>{errors.guests && <span className="field-error" id="guests-error">{errors.guests}</span>}</label>
                  <label className="field field-wide" htmlFor="notes">Anything we should know? <span>(optional)</span><textarea id="notes" name="notes" rows="3" value={values.notes} onChange={change} placeholder="A special occasion, dietary needs..." /></label>
                </div>
                <button className="button button-primary form-submit" type="submit">Request a table <span aria-hidden="true">↗</span></button>
                <p className="form-disclaimer">No payment needed. We'll be in touch to confirm your table.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
