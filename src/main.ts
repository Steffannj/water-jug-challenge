import Aurelia from 'aurelia';
import { MyApp } from './my-app';
import { initialState } from './initialstate';
import { RouterConfiguration } from '@aurelia/router';
import { StoreConfiguration } from '@aurelia/store-v1';
import { I18nConfiguration } from '@aurelia/i18n';
import * as en from './locale/en/translation.json';
import { NumberValueConverter } from './common';
import { ValidationHtmlConfiguration } from '@aurelia/validation-html';

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
  .register(NumberValueConverter) //registering global value converters 
  .app(MyApp)
  .start();
