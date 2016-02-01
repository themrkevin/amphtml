/**
 * Copyright 2015 The AMP HTML Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {isLayoutSizeDefined} from '../../../src/layout';
import {loadPromise} from '../../../src/event-helper';

class AmpSms extends AMP.BaseElement {

  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }

  /** @override */
  layoutCallback() {
    const amp = this.element;
    const children = this.getRealChildNodes();
    const link = document.createElement('a');
    const props = {
      "title": amp.getAttribute('data-title'),
      "url": amp.getAttribute('data-url'),
    };
    const smsSeparator = ((ua) => {
      if (ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1) {
        var m = ua.match(/OS (\d+)_/);
        var version = m && parseInt(m[1], 10);
        return (version >= 8) ? "&" : ";";
      } else {
        return "?";
      }
    })(navigator.userAgent);

    children.forEach(child => {
      link.appendChild(child);
    });

    link.href = "sms:"+smsSeparator+"body="+encodeURIComponent(props.title+" "+props.url);
    link.target = amp.getAttribute('target');

    this.applyFillContent(link);
    amp.appendChild(link);

    return loadPromise(link);
  }
}

AMP.registerElement('amp-sms', AmpSms);
