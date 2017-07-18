<template>
    <div id="notes" class="row">
        <div class="col s5 full-height relative no-padding flex flex-center">
            <div class="sidebar flex-flow-column flex" :class="{'show-sidebar': notesMeta.showSidebar && notesMeta.count}">
                <div class="notes-count">
                    <span>Notes</span> <span class="right">{{notes.length}} / 10</span></div>
                <transition-group name="flip-list" tag="ul" id="note-list" class="note-list">
                    <li v-for="(note,index) in sortedNoted" class="flex flex-flow-column pointer" :class="{'active': isActiveNote(note.id)}"
                        v-on:click="setCurrentNote(note.id)" v-bind:key="note">
                        <p class="note-title" v-html="trimContent(note.content)"></p>
                        <div class="note-data">{{note.createdOn | formatDate}}</div>
                    </li>
                </transition-group>
                <!--</ul>-->
                <div class="add-note" v-if="sortedNoted.length < 10">
                    <img src="images/plus.svg" class="pointer" alt="" style="vertical-align: bottom;" v-on:click="createNote">
                </div>
            </div>
        </div>
        <div v-if="!notesMeta.count" class="col s7 note full-height relative no-padding flex flex-justify-center flex-flow-column flex-center">
            <div>
                <img src="images/note_landing_page_icon.png">
            </div>
            <h5 class="italics create_note pointer" v-on:click="createFirstNote">Create first note</h5>
        </div>
        <div v-if="notesMeta.count" class="col s7 note full-height no-padding relative flex-flow-column flex">
            <div class="button-section">
                <img src="images/delete.svg" class="pointer right" v-on:click="deleteNote">
                <img src="images/arrow.svg" class="pointer arrow" v-on:click="toggleNoteList" :class="{'rotate': notesMeta.showSidebar}">
            </div>
            <div class="note-error" v-if="errorMessage">{{errorMessage}}</div>
            <div id="note" contenteditable="true" v-html="currentNoteContent" @input="debounceInput"></div>
        </div>
    </div>
</template>

<script>
    import _debounce from '../utils/debounce'
    import storage from '../utils/storage'
    import constants from '../utils/Constants'
    export default {
        beforeCreate(){
            this.notesMeta = storage.get(constants.STORAGE.NOTES_META) || { count: 0, showSidebar: true };
        },
        data () {
            return {
                input: '',
                notes: [],
                currentNote:'',
                currentNoteContent:'',
                notesMeta: this.notesMeta,
                errorMessage: null
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
            addNoteLimit(element){
                let el = document.getElementById(element);
                let self = this;
                if(!el){
                    return;
                }
                let maxValue = 2000;
                el.onkeyup = function(e){
                    if (e.which !== 8 && el.innerText.length > maxValue) {
                        self.errorMessage = 'Content limit reached for this note.';
                        e.preventDefault();
                    }else{
                        self.errorMessage = null;
                    }
                };

                el.onkeydown = function(e) {
                    if (e.which !== 8 && el.innerText.length > maxValue) {
                        e.preventDefault();
                    }
                };
            },
            getNoteTemplate(){
                let id = this.notesMeta.count + 1;
                for (let j = 1; j < id; j++) {
                    if (!storage.get('note-' + j)) {
                        id = j;
                        break;
                    }
                }
                this.notesMeta.count++;

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
                for (let i = 0; i < this.notesMeta.count; i++) {
                    note = storage.get('note-' + (i + 1));
                    if (note) {
                        this.notes.push(note)
                    }
                }
                if (this.notesMeta.count > 0) {
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
            debounceInput(el){
                let self = this;
                _debounce(() => {
                    let content = el.target.innerHTML;
                    if (content.length > 2000) {
                        content = content.slice(0, 2000);
                    }
                    self.currentNote.content = content;
                    self.currentNote.updatedOn = +new Date();
                    storage.set('note-' + self.currentNote.id, self.currentNote);
                }, 1000)();
            },
            toggleNoteList(){
                this.notesMeta.showSidebar = !this.notesMeta.showSidebar
            },
            deleteNote(e){
                e.preventDefault();
                e.stopPropagation();
                for (let j = 0; j < this.notes.length; j++) {
                    if (this.notes[j].id === this.currentNote.id) {
                        this.notes.splice(j, 1);
                        break;
                    }
                }
                storage.remove('note-' + this.currentNote.id);
                console.log("Removing note with id ", this.currentNote.id);
                if (this.notes.length > 0) {
                    this.currentNote = this.notes[0];
                    this.setCurrentNote(this.currentNote.id);
                }
                this.notesMeta.count--;
            },
            createNote(){
                if(this.notes && this.notes.length > 9){
                    return;
                }
                let newNote = this.getNoteTemplate();
                this.notes.unshift(newNote);
                storage.set('note-' + newNote.id, newNote);
                setTimeout(() => this.setCurrentNote(newNote.id), 100);
            },
            createFirstNote(e){
                let self = this;
                this.createNote(e);
                this.showSidebar = true;
                setTimeout(()=>{
                    //console.log('Listener Called', document.getElementById("note"));
                    /*document.getElementById("note").addEventListener("input", (e) => {
                        self.debounceInput();
                    });*/

                    self.isolateScroll('note');
                },100);
            }
        },
        watch:{
          notesMeta: {
              handler: function (newValue){
                  console.log('New Value of Meta', newValue);
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
    }
</script>