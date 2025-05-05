import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslationService } from './modules/i18n';
// language list
import { locale as enLang } from './modules/i18n/vocabs/en';
import { locale as chLang } from './modules/i18n/vocabs/ch';
import { locale as esLang } from './modules/i18n/vocabs/es';
import { locale as jpLang } from './modules/i18n/vocabs/jp';
import { locale as deLang } from './modules/i18n/vocabs/de';
import { locale as frLang } from './modules/i18n/vocabs/fr';
import { ThemeModeService } from './_metronic/partials/layout/theme-mode-switcher/theme-mode.service';
import { messaging } from 'src/firebase-config';
import { getToken, onMessage } from 'firebase/messaging';

@Component({
  // tslint:disable-next-line:component-selector
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'body[root]',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {


  constructor(
    private translationService: TranslationService,
    private modeService: ThemeModeService
  ) {
    // register translations
    this.translationService.loadTranslations(
      enLang,
      chLang,
      esLang,
      jpLang,
      deLang,
      frLang
    );
  }

  ngOnInit() {
    this.modeService.init();
    // console.log('Service Worker Supported:', 'serviceWorker' in navigator);
    //   console.log('Push Manager Supported:', 'PushManager' in window);
  }
}

// navigator.serviceWorker
//   .register("/firebase-messaging-sw.js")  
//   .then((registration) => {
//     console.log("✅ Service Worker Registered:", registration);
//     requestFCMToken(); 
//   })
//   .catch((err) => console.error("❌ Service Worker registration failed:", err));

// async function requestFCMToken() {
//   try {
//     const permission = await Notification.requestPermission();
//     if (permission !== "granted") {
//       console.warn("🚫 Notification permission denied.");
//       return;
//     }

//     const token = await getToken(messaging, {
//       vapidKey: "BNa3kBNBsU1Ex0fW62gtulFzKht_aStjU14zOUDx-jZmwLFsfikkEEQyv09a6ESR4eX93S3yw5mzEmmkN51cli8"
//     });

//     console.log("🎯 FCM Device Token:", token);
//   } catch (error) {
//     console.error("❌ Error retrieving FCM token:", error);
//   }
// }




