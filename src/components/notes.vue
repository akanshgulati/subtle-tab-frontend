<template>
    <div id="notes" v-on:click.stop="" class="notes-arrow_box">
        <div v-if="!notesMeta.count" class="col s12 note full-height relative no-padding flex flex-justify-center flex-flow-column flex-center">
            <div>
                <img src="images/note_landing_page_icon.png">
            </div>
            <h5 class="italics create_note pointer" v-on:click="createFirstNote">Create first note</h5>
        </div>
        <div v-if="notesMeta.count" class="full-height">
            <div class="note full-height no-padding relative flex-flow-column flex">
                <header class="flex widget-header flex-center">
                    <svg class="pointer" v-on:click="toggleNoteList" width="1.3rem" height="1rem" viewBox="0 0 23 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <defs></defs>
                        <g  stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="hamburger" transform="translate(0.000000, 2.000000)" stroke="#7d7d7d" stroke-width="4">
                                <path d="M0.132183908,0 L22.8678161,0" id="XMLID_6_"></path>
                                <polyline id="XMLID_9_" points="0.132183908 16.8 20.0697663 16.8 22.8678161 16.8"></polyline>
                                <path d="M0.132183908,8.4 L22.8678161,8.4" id="XMLID_8_"></path>
                            </g>
                        </g>
                    </svg>
                    <h4 class="widget-heading mar-0">Notes (N)</h4>
                    <div class="button-section flex">
                        <div>
                            <svg v-if="sortedNoted.length < 10" class="pointer" v-on:click="createNote" width="1.3rem" height="1.3rem"
                                 viewBox="0 0 24 25" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <defs></defs>
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="create_note" transform="translate(0.000000, 1.000000)" fill="#7d7d7d">
                                        <path d="M22.5687588,1.87004 L21.1887588,3.43004 L21.1002619,3.53002 C21.1002619,3.54003 21.09146,3.55004 21.082605,3.56005 L20.0122027,4.76 L9.21103115,16.97001 L7.37107538,17.58 L7.98146,15.58 L18.7825785,3.37999 L19.8529808,2.17003 L19.8529808,2.16002 L21.3391258,0.48003 C21.5072027,0.29003 21.7283565,0.2 21.9495104,0.2 C22.1795192,0.2 22.4006731,0.29003 22.56875,0.48003 C22.9049215,0.86003 22.9049215,1.49003 22.5687588,1.87004 Z"
                                              id="Shape" fill-rule="nonzero"></path>
                                        <path d="M22.5687588,1.87004 L9.21103115,16.97001 L7.37107538,17.58 L7.98146,15.58 L21.3391346,0.48002 C21.5072115,0.29002 21.7283654,0.19999 21.9495192,0.19999 C22.1795281,0.19999 22.4006819,0.29002 22.5687588,0.48002 C22.9049215,0.86003 22.9049215,1.49003 22.5687588,1.87004 Z"
                                              id="Shape" fill-rule="nonzero"></path>
                                        <path d="M20.6933565,6.82001 L21.2595104,6.18001 L22.0202796,5.33001 L22.0202796,20.79001 C22.0202796,22.45001 20.9056642,23.80001 19.5433565,23.80001 L2.664895,23.80001 C1.29374115,23.80001 0.179125769,22.45001 0.179125769,20.79001 L0.179125769,4.38001 C0.179125769,2.72001 1.29374115,1.37001 2.664895,1.37001 L18.0572027,1.37001 L16.7302796,2.87001 L2.664895,2.87001 C2.02797192,2.87001 1.50604885,3.55001 1.50604885,4.38001 L1.50604885,20.79001 C1.50604885,21.62001 2.02797192,22.30001 2.664895,22.30001 L19.5433565,22.30001 C20.1802796,22.30001 20.6933565,21.62001 20.6933565,20.79001 L20.6933565,6.82001 Z"
                                              id="Shape" fill-rule="nonzero"></path>
                                        <path d="M20.6933565,6.82001 L21.2595104,6.18001 L22.0202796,5.33001 L22.0202796,20.79001 C22.0202796,22.45001 20.9056642,23.80001 19.5433565,23.80001 L2.664895,23.80001 C1.29374115,23.80001 0.179125769,22.45001 0.179125769,20.79001 L0.179125769,4.38001 C0.179125769,2.72001 1.29374115,1.37001 2.664895,1.37001 L18.0572027,1.37001 L16.7302796,2.87001 L2.664895,2.87001 C2.02797192,2.87001 1.50604885,3.55001 1.50604885,4.38001 L1.50604885,20.79001 C1.50604885,21.62001 2.02797192,22.30001 2.664895,22.30001 L19.5433565,22.30001 C20.1802796,22.30001 20.6933565,21.62001 20.6933565,20.79001 L20.6933565,6.82001 Z"
                                              id="Shape"></path>
                                        <path d="M22.5687588,1.87004 L20.0122115,4.75999 L9.21103115,16.97001 L7.37107538,17.58 L7.98146,15.58 L18.7825785,3.37999 L21.3391258,0.48003 C21.5072027,0.29003 21.7283565,0.2 21.9495104,0.2 C22.1795192,0.2 22.4006731,0.29003 22.56875,0.48003 C22.9049215,0.86003 22.9049215,1.49003 22.5687588,1.87004 Z"
                                              id="Shape" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M21.1053573,3.50513 C21.1418565,3.17338 20.1768208,2.08658 19.8857735,2.15523" id="Shape"
                                              stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"></path>
                                        <path d="M18.8007219,3.36565 C19.076775,3.24722 20.1262385,4.44106 20.0272854,4.73297" id="Shape"
                                              stroke-width="0.7" stroke-linecap="round" stroke-linejoin="round"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div>
                            <svg v-on:click="deleteNote" class="pointer" width="1.3rem" height="1.3rem" viewBox="0 0 30 36" version="1.1"
                                 xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                    <g id="delete_note" fill-rule="nonzero" fill="#7d7d7d">
                                        <polygon points="9.875 11.175 12.125 11.175 12.125 29.175 9.875 29.175" ></polygon>
                                        <polygon points="17.375 11.175 19.625 11.175 19.625 29.175 17.375 29.175" ></polygon>
                                        <polygon points="0.375 4.425 29.625 4.425 29.625 6.675 0.375 6.675" ></polygon>
                                        <path d="M20.55,5.55 L18.45,5.55 L18.45,3.3 C18.45,2.625 17.925,2.1 17.25,2.1 L12.75,2.1 C12.075,2.1 11.55,2.625 11.55,3.3 L11.55,5.55 L9.45,5.55 L9.45,3.3 C9.45,1.5 10.95,0 12.75,0 L17.25,0 C19.05,0 20.55,1.5 20.55,3.3 L20.55,5.55"
                                              ></path>
                                        <path d="M21.75,35.925 L8.25,35.925 C6.45,35.925 4.875,34.425 4.725,32.625 L2.625,5.625 L4.875,5.475 L6.975,32.475 C7.05,33.15 7.65,33.675 8.25,33.675 L21.75,33.675 C22.425,33.675 23.025,33.075 23.025,32.475 L25.125,5.475 L27.375,5.625 L25.275,32.625 C25.125,34.5 23.55,35.925 21.75,35.925"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>
                </header>
                <div class="note-error" v-if="errorMessage">{{errorMessage}}</div>
                <section class="flex relative note-section flex-flow-column">
                    <div class="sidebar flex-flow-column flex" :class="{'show-sidebar': showSidebar && notesMeta.count}">
                        <transition-group name="flip-list" tag="ul" id="note-list" class="note-list flex flex-flow-column flex-center">
                                <li v-for="(note,index) in sortedNoted" class="flex flex-flow-column pointer" :class="{'active': isActiveNote(note.id)}"
                                    v-on:click="setCurrentNote(note.id); showSidebar = false;" v-bind:key="note">
                                    <p class="note-title" v-html="trimContent(note.content)"></p>
                                    <div class="note-data">{{note.createdOn | formatDate}}</div>
                                </li>
                            </transition-group>
                        </div>
                    <div id="note" contenteditable="true" v-html="currentNoteContent" @input="handler" v-on:click.stop="showSidebar = false"></div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
    import _debounce from '../utils/debounce'
    import storage from '../utils/storage'
    import constants from '../utils/Constants'
    export default {
        beforeCreate(){
            this.notesMeta = storage.get(constants.STORAGE.NOTES_META) || {count: 0, deletedNotes: [], createdNotes: []};
        },
        data () {
            return {
                input: '',
                notes: [],
                currentNote:'',
                currentNoteContent:'',
                notesMeta: this.notesMeta,
                errorMessage: null,
                showSidebar: false
            }
        },
        mounted(){
            this.isolateScroll('note');
            this.isolateScroll('note-list');
            document.execCommand("DefaultParagraphSeparator", false, "p");
            this.populateNotes();
            this.addNoteLimit('note');
        },
        computed:{
            sortedNoted: function(){
                let notes = this.notes;
                notes.sort(function (a, b) {
                    return b.updatedOn - a.updatedOn;
                });
                return notes;
            }
        },
        methods:{
            handler(e){
                this.debouncedInput(e, this);
                this.debouncedInputSync(this);
            },
            debouncedInput: _debounce((el, self) => {
                let content = el.target.innerHTML;
                if (content.length > 7000) {
                    content = content.slice(0, 7000);
                }
                self.currentNote.content = content;
                self.currentNote.updatedOn = +new Date();
                storage.setLocal('note-' + self.currentNote.id, self.currentNote);
            }, 1000),
            debouncedInputSync: _debounce(function(self){
                storage.chromeSync.set('note-' + self.currentNote.id, self.currentNote);
            }, 5000),
            addNoteLimit(element){
                let el = document.getElementById(element);
                let self = this;
                if(!el){
                    return;
                }
                let maxValue = 7000;
                el.onkeyup = function(e){
                    if (el.innerHTML.length > maxValue) {
                        self.errorMessage = 'Content limit reached for this note.';
                        e.preventDefault();
                    }else if(e.which === 27){
                        el.blur();
                    }else{
                        self.errorMessage = null;
                    }
                };

                el.onkeydown = function(e) {
                    if (e.which !== 8 && el.innerHTML.length > maxValue) {
                        self.errorMessage = 'Content limit reached for this note.';
                        e.preventDefault();
                    }
                };
            },
            getNoteTemplate(){
            //    let id = this.notesMeta.count + 1;
                let id;
                // Removing the id
                if (this.notesMeta.deletedNotes.length) {
                    id = Math.min(...this.notesMeta.deletedNotes);
                    this.notesMeta.deletedNotes.splice(this.notesMeta.deletedNotes.indexOf(id), 1);
                } else {
                    id = this.notesMeta.createdNotes.length + 1;
                }
                return {
                    id: id,
                    createdOn: +new Date(),
                    updatedOn: +new Date(),
                    content: 'Enter Content Here'
                }
            },
            sortNotes(){
                return this.notes.sort(function(a,b){
                    return  b.updatedOn - a.updatedOn;
                });
            },
            isActiveNote: function(id){
                return this.currentNote.id === id;
            },
            setCurrentNote(id){
                for (let i = 0; i < this.notes.length; i++) {
                    if (this.notes[i].id === id) {
                        this.currentNote = this.notes[i];
                        //this.currentNote.updatedOn = +new Date();
                        break;
                    }
                }
                this.errorMessage = null;
                document.getElementById("note").innerHTML = this.currentNote.content;
            },
            trimContent(value){
                let ellipsis = '';
                value = value.replace(/<(?:.|\n)*?>/gm, ' ');
                if (!value.length || !value) {
                    return 'New Note';
                }
                if (value.length > 25) {
                    ellipsis = '...';
                }
                return value.slice(0, 25) + ellipsis;
            },
            populateNotes(){
                let note;
                for (let i = 0; i < this.notesMeta.createdNotes.length; i++) {
                    note = storage.get('note-' + this.notesMeta.createdNotes[i]);
                    if (note) {
                        this.notes.push(note)
                    }
                }
                if (this.notesMeta.createdNotes.length > 0 && this.notes.length > 0) {
                    this.sortNotes();
                    this.currentNote = this.notes[0];
                    this.currentNoteContent = this.currentNote.content;
                }
            },
            isolateScroll(elementId){
                let el = document.getElementById(elementId);
                if(!el){
                    return;
                }
                el.onmousewheel = function (e) {
                    el.scrollTop -= e.wheelDeltaY;
                    e = e || window.event;
                    if (e.preventDefault)
                        e.preventDefault();
                    e.returnValue = false;
                }
            },
            toggleNoteList(){
                this.showSidebar = !this.showSidebar
            },
            deleteNote(e){
                e.preventDefault();
                e.stopPropagation();
                if (!confirm('Are you sure you want to delete this note?')) {
                    return;
                }
                this.showSidebar = true;
                for (let j = 0; j < this.notes.length; j++) {
                    if (this.notes[j].id === this.currentNote.id) {
                        this.notes.splice(j, 1);
                        break;
                    }
                }
                storage.remove('note-' + this.currentNote.id);
                this.notesMeta.deletedNotes.push(this.currentNote.id);
                this.notesMeta.createdNotes.splice(this.notesMeta.createdNotes.indexOf(this.currentNote.id), 1);
                this.notesMeta.count--;

                if (this.notes.length > 0) {
                    this.currentNote = this.notes[0];
                    this.setCurrentNote(this.currentNote.id);
                }
            },
            createNote(e){
                e.stopPropagation();
                this.showSidebar = true;
                if(this.notes && this.notes.length > 9){
                    return;
                }
                let newNote = this.getNoteTemplate();
                this.notes.unshift(newNote);
                this.notesMeta.createdNotes.push(newNote.id);
                this.notesMeta.count++;
                storage.set('note-' + newNote.id, newNote);
                setTimeout(() => this.setCurrentNote(newNote.id), 100);
            },
            createFirstNote(e){
                let self = this;
                this.createNote(e);
                this.showSidebar = true;
                setTimeout(()=>{
                    self.isolateScroll('note');
                },100);
            }
        },
        watch:{
          notesMeta: {
              handler: function (newValue){
                  storage.set(constants.STORAGE.NOTES_META, newValue);
              },
              deep: true
          }
        },
        filters:{
            formatDate(value){
                if (!value) {
                    return;
                }
                let date = new Date(value);
                let now = +new Date();
                return now - date >= 86400000 ? date.toLocaleDateString() : date.toLocaleTimeString();
            }
        }
    };
</script>