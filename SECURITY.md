# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in UnTrackt, please report it responsibly.

**Do not open a public GitHub issue for security vulnerabilities.**

Instead, please email **support@untrackt.com** with:

- A description of the vulnerability
- Steps to reproduce the issue
- The potential impact
- Any suggested fix (optional)

We will acknowledge your report within 48 hours and aim to provide a fix or mitigation plan within 7 days.

## Scope

UnTrackt is a static, client-side web application. There is no backend server, database, or user authentication system. The primary security concerns are:

- **XSS (Cross-Site Scripting)** — Ensuring user inputs rendered in the DOM are properly sanitized
- **Dependency vulnerabilities** — Keeping npm dependencies up to date
- **Privacy violations** — Any code that transmits user data externally (aside from the documented `open.er-api.com` exchange rate API in the Currency Converter)

## Out of Scope

- Issues in third-party dependencies that do not affect UnTrackt's usage
- Browser-specific bugs not caused by UnTrackt code
- Social engineering attacks

## Recognition

We appreciate security researchers who help keep UnTrackt safe. With your permission, we will credit you in the release notes when a reported vulnerability is fixed.
