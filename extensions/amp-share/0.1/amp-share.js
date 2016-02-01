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

class AmpShare extends AMP.BaseElement {

  /** @override */
  isLayoutSupported(layout) {
    return isLayoutSizeDefined(layout);
  }

  /** @override */
  layoutCallback() {
    const amp = this.element;
    const children = this.getRealChildNodes();
    const link = document.createElement('a');
    const props = buildProperties(amp);

    children.forEach(child => {
      link.appendChild(child);
    });
    link.href = buildShareUrl(props);
    link.target = amp.getAttribute('target');
    this.applyFillContent(link);

    amp.appendChild(link);

    function buildProperties(el) {
      return {
        "type": el.getAttribute('data-type'),
        "title": el.getAttribute('data-title'),
        "url": el.getAttribute('data-url'),
        "image": el.getAttribute('data-image'),
      };
    }

    function smsSeparator() {
      var ua = navigator.userAgent;
      if (ua.indexOf("iPad") > -1 || ua.indexOf("iPhone") > -1) {
        var m = ua.match(/OS (\d+)_/);
        var version = m && parseInt(m[1], 10);
        return (version >= 8) ? "&" : ";";
      } else {
        return "?";
      }
    }

    function buildShareUrl(obj) {
      var url;
      switch(obj.type) {
        case "sms":
          url = "sms:"+smsSeparator()+"body="+encodeURIComponent(props.title+" "+props.url);
        break;
      }
      return url;
    }

    return loadPromise(link);
  }
}

AMP.registerElement('amp-share', AmpShare);
