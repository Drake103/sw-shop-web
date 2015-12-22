import angluar from 'angular';
import ngRoute from 'angular-route';

import Header from './shared/header/header.directive';
import Navbar from './shared/navbar/navbar.directive';
import Footer from './shared/footer/footer.directive';

import AuthModule from './modules/auth/auth.module';
import CatalogModule from './modules/catalog/catalog.module';

var app = angular.module('sws', [AuthModule, CatalogModule]);

app.directive('swsHeader', Header.directiveFactory);
app.directive('swsNavbar', Navbar.directiveFactory);
app.directive('swsFooter', Footer.directiveFactory);

export default app;
