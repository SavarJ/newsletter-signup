# Newsletter Mailing List Sign Up

A simple yet fully responsive newsletter mailing list sign up web app that will sign up users to the mailling list using MailChimp. Users will also get a verification email after they sign up.

## Table of Contents

- [Deployment](#deployment)
- [Built With](#built-with)
- [Requirements](#requirements)
- [Install](#install)
- [Author(s)](#authors)
- [License](#license)
- [Acknowledgement](#acknowledgement)

</br>

## Deployment

**[Live Demo: https://savarj-newsletter.herokuapp.com/](https://savarj-newsletter.herokuapp.com/)**

<br>

![Signup-page](public/images/signup.png)

<br>

![Sucess-page](public/images/success.png)

## Built With

- [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/)
- [Node.js](https://nodejs.org/en/docs/)
- [Express.js](https://expressjs.com/en/5x/api.html)
- [MailChimp API](https://mailchimp.com/developer/)

## Requirements

For development, you will only need Node.js and a node global package, NPM, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer. Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v14.17.0

    $ npm --version
    6.14.13

## Install

    $ git clone https://github.com/SavarJ/newsletter-signup.git
    $ cd newsletter-signup
    $ npm install

### Updating .env

Rename `.env.sample` to `.env` with the appropriate information

### Running the project

    $ npm start

## Author(s)

- **[Savar Jain](https://jainsavar.com)**

## License

![MIT License](https://camo.githubusercontent.com/c97d380d0a98377c53391026883a89c16ded751eb41f9e57a53e009664447d50/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542532304c6963656e73652d626c75652e737667)

Copyright (c) 2021 Savar Jain

Licensed under the [MIT License](LICENSE)

## Acknowledgement

- Challenge Project of The Complete 2021 Web Development Bootcamp by Dr. Angela Yu with some twists/changes
