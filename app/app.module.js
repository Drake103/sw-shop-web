import angluar from 'angular';
import ngRoute from 'angular-route';
import 'angular-ui-bootstrap';

import Header from './shared/header/header.directive';
import Navbar from './shared/navbar/navbar.directive';
import Footer from './shared/footer/footer.directive';

import AuthModule from './modules/auth/auth.module';
import CatalogModule from './modules/catalog/catalog.module';

import authRunBlock from './modules/auth/auth.runblock';

var app = angular.module('sws', [AuthModule, CatalogModule, 'ui.bootstrap']);

app.directive('swsHeader', Header.directiveFactory);
app.directive('swsNavbar', Navbar.directiveFactory);
app.directive('swsFooter', Footer.directiveFactory);

app.run(authRunBlock);

export default app;
