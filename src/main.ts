import Aurelia from 'aurelia';
import { RouterConfiguration } from '@aurelia/router';
import { StoreConfiguration } from '@aurelia/store-v1';
import { I18nConfiguration } from '@aurelia/i18n';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';
import { NumberValueConverter } from './common';
import { Shell } from './shell';
import { initialState } from './initialstate';
import * as en from './locale/en/translation.json';
import 'bootstrap';

Aurelia
  .register(
    ValidationHtmlConfiguration,
    RouterConfiguration,
    StoreConfiguration.withInitialState(initialState),
    I18nConfiguration.customize((options) => {
      options.initOptions = {
        resources: {
          en: { translation: en },
        }
      };
    }),
  )
  .register(NumberValueConverter) // Registering global value converters 
  .app(Shell)
  .start();
