import button from './button';
import dialog from './dialog';
import dropdown from './dropdown';
import tabmenu from './tabmenu';
import panelmenu from './panelmenu';
import global from './global';
import datatable from './datatable';
import tag from './tag';
import badge from './badge';
import badgedirective from './badgedirective';
import ripple from './ripple';
import tooltip from './tooltip';
import tabview from './tabview';
import inputtext from './inputtext';
import overlaypanel from './overlaypanel'
import radiobutton from './radiobutton';

export default {
    global,
    directives: {
        badge: badgedirective,
        ripple,
        tooltip
    },
    badge,
    button,
    dialog,
    dropdown,
    tabmenu,
    tabview,
    panelmenu,
    datatable,
    tag,
    inputtext,
    overlaypanel,
    radiobutton
}