// import common component classes
import {ModalHeader} from './modal-header/modal-header.ts'
import {ModalBody} from './modal-body/modal-body.ts'
import {ModalFooter} from './modal-footer/modal-footer.ts'

// bundle component classes into angular components
export default angular.module('app.common.components.modal.components', [])
.component('modalHeader', new ModalHeader())
.component('modalBody', new ModalBody())
.component('modalFooter', new ModalFooter())
