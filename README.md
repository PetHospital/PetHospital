# PetHospital

This is the virtual pet hospital system with hospital navigation, medical records and online tests.

## Frontend

This front end was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Backend

### Development mode
under the 'PetHospital-client' directory,
run the following commands

1. `pip install -r requirement.txt`
2. `pip install git+git://github.com/sshwsfc/xadmin.git@django2`
3. `python3 manage.py collectstatic`
4. `python3 manage.py runserver`

### Nginx&uswgi(Ubuntu)
1. `sudo apt-get install nginx`
2. `pip install uswgi`
3. go to current directory
4. `python3 manage.py collectstatic`
5. set the upstream server of nginx as uwsgi
6. `nohup uwsgi --http :8000 --wsgi-file PetHospital/wsgi.py --logto ./log.txt &`
7. `disown`

### API docs
`localhost:8000/docs/`

### admin system
url: `localhost:8000`

account: admin

password: qwertyuiop