/** This file could be JSON! I'm including it as a JS module simply so that I can include comments.
 *
 * A walk consists of an array of stops and some basic metadata
 *
 * id:						string, a unique ID, required
 * title:					string, the title for the walk
 * stops:					an array of stops, required
 *
 * Each stop consists of:
 *
 * id: 						string, a unique ID for the stop within the walk, required
 * type: 					enum ("video" | "audio" | "book" | "comment" | "image" | "web" | "software") –
 * 			 					This isn't required, but if it's not there (or not one of those), you'll just see JSON in the stop.
 * 			 					"comment" is a special type in that it's not an iframe, it's just text.
 * title: 				string, a name for the stop (if desired)
 * isStartPoint:  boolean, true if this stop can be a starting point for a walk.
 * 							  This isn't required, and could be inferred from a stop having a "nextStop" value?
 * isStopPoint:		boolean, true is this stop can be a stopping point for a walk.
 * 								This isn't required and could probably be inferred (though maybe not that useful)
 * nextStop:			string, an ID of a next stop
 * 					 			This is for the main spine of the walk.
 * 								If a stop's ID is listed somewhere else as a nextStop and there's no nextStop value,
 * 								it could be declaared to be an endPoint.
 * sideTrips:			an array of IDs of stops that this stop could connect to.
 * 								sideTrips are for annotations – things that are not the main spine of the walk.
 * url: 					string/URL, for type video, audio, book, image, web, or software, the embed link.
 * width:					number, width in pixels
 * height:				number, height in pixels
 * 								If width or height are not set, there are defaults for each media type.
 * left:					number, distance in pixels from left
 * top:						number, distance in pixels from top
 * 								If left or top are not set, a value wll be created (this is not very smart right now)
 * text:					string, comment on a stop
 *
 * Web embed URLs aren't being broken down – so if you want a 1-up book, use this:
 *
 * url: "https://archive.org/embed/encyclopedia-britannica-and-intellectual-tools-of-the-future/page/n7/mode/1up?view=theater&ui=embed"
 *
 * while if you wanted it 2-up, you could use this:
 *
 * url: "https://archive.org/embed/encyclopedia-britannica-and-intellectual-tools-of-the-future/page/n7/mode/2up?view=theater&ui=embed"
 *
 * I'm not 100% sure about the best URL formats for embeds, and maybe these could be improved and then parameterized.
 *
 * ## IDEAS
 *
 * Could a walk be a stop type? I.e. if you linked to another walk as a sideTrip?
 *
 * ## NOTES
 *
 * http://archive.org/download/IDENTIFIER/FILE.mp4?start=30&end=60
 *
 **/

const yOffset = 370;
const xOffset = [10, 350, 750, 1150];

const walkData = {
  walks: [
    {
      id: "alankaywalk",
      title: "Alan Kay talk 1995",
      author: "Dan Visel",
      date: "10 May 2021",
      stops: [
        {
          id: "intro",
          type: "comment",
          isStartPoint: true,
          title: "Introduction",
          text: "This walk annotates a lecture given by Alan Kay from the 1995 Vannebar Bush symposium, presenting material refered to that's in the Internet Archive.",
          nextStop: "kay1",
        },
        {
          id: "kay1",
          type: "video",
          url: "https://archive.org/embed/XD1941_9_95VannevarBushSymTape10_AlanKay/XD1941_9_95VannevarBushSymTape10_AlanKay.cdr?start=240",
          title: "Arthur Koestler's biosociation",
          width: 320,
          height: 240,
          left: xOffset[2],
          top: 10,
          nextStop: "kay2",
          sideTrips: ["annotation1"],
        },
        {
          id: "annotation1",
          type: "book",
          width: 320,
          height: 500,
          left: xOffset[3],
          top: 10,
          title: "The Act of Creation",
          text: "Arthur Koestler’s THE ACT OF CREATION",
          url: "https://archive.org/embed/actofcreation00koes/mode/1up?view=theater&ui=embed",
          sideTrips: ["kay1"],
        },
        {
          id: "kay2",
          type: "video",
          url: "https://archive.org/embed/XD1941_9_95VannevarBushSymTape10_AlanKay/XD1941_9_95VannevarBushSymTape10_AlanKay.cdr?start=495",
          title: "Seeing “As We May Think”",
          width: 320,
          height: 240,
          left: xOffset[2],
          top: 10 + yOffset,
          nextStop: "kay3",
          sideTrips: ["annotation2"],
        },
        {
          id: "annotation2",
          type: "book",
          width: 320,
          height: 500,
          left: xOffset[1],
          top: 10 + yOffset,
          title: "As We May Think",
          text: "Vannevar Bush's “As We May Think” as it appeared in LIFE",
          url: "https://archive.org/embed/as-we-may-think/mode/1up?view=theater&ui=embed",
          sideTrips: ["annotation21"],
        },
        {
          id: "annotation21",
          type: "book",
          width: 320,
          height: 500,
          left: xOffset[1],
          top: 10 + yOffset,
          title: "As We May Think",
          text: "Vannevar Bush's “As We May Think” as it appeared in LIFE",
          url: "https://archive.org/embed/as-we-may-think/mode/1up?view=theater&ui=embed",
          sideTrips: ["kay2"],
        },
        {
          id: "kay3",
          type: "video",
          url: "https://archive.org/embed/XD1941_9_95VannevarBushSymTape10_AlanKay/XD1941_9_95VannevarBushSymTape10_AlanKay.cdr?start=1320",
          title: "Ivan Sutherland & Sketchpad",
          width: 320,
          height: 240,
          left: xOffset[2],
          top: 10 + yOffset * 2,
          nextStop: "kay4",
          sideTrips: ["annotation3"],
        },
        {
          id: "annotation3",
          type: "book",
          width: 320,
          height: 500,
          left: xOffset[3],
          top: 10 + yOffset * 2,
          title: "Ivan Sutherland’s dissertation",
          text: "Ivan Sutherland’s dissertation describing Sketchpad",
          url: "https://archive.org/embed/bitsavers_mittx2SketphicalCommunicationSystemJan63_8890661/mode/1up?view=theater&ui=embed",
          sideTrips: ["kay3"],
        },
        {
          id: "kay4",
          type: "video",
          url: "https://archive.org/embed/XD1941_9_95VannevarBushSymTape10_AlanKay/XD1941_9_95VannevarBushSymTape10_AlanKay.cdr?start=1480",
          title: "The gene",
          width: 320,
          height: 240,
          left: xOffset[2],
          top: 10 + yOffset * 3,
          nextStop: "kay5",
          sideTrips: ["annotation4"],
        },
        {
          id: "annotation4",
          type: "book",
          width: 320,
          height: 500,
          left: xOffset[1],
          top: 10 + yOffset * 3,
          title: "Molecular Biology of the Gene",
          text: "James D. Watson's Molecular Biology of the Gene – second edition",
          url: "https://archive.org/embed/molecularbiology00wats/mode/1up?view=theater&ui=embed",
          sideTrips: ["kay4"],
        },
        {
          id: "kay5",
          type: "video",
          url: "https://archive.org/embed/XD1941_9_95VannevarBushSymTape10_AlanKay/XD1941_9_95VannevarBushSymTape10_AlanKay.cdr?start=2255",
          title: "Doug Engelbart",
          width: 320,
          height: 240,
          left: xOffset[2],
          top: 10 + yOffset * 4,
          sideTrips: ["annotation5"],
        },
        {
          id: "annotation5",
          type: "video",
          url: "https://archive.org/embed/XD300-23_68HighlightsAResearchCntAugHumanIntellect",
          title: "Engelbart’s 1968 demo, 1",
          width: 320,
          height: 240,
          left: xOffset[3],
          top: 10 + yOffset * 4,
          sideTrips: ["annotation51"],
        },
        {
          id: "annotation51",
          type: "video",
          url: "https://archive.org/embed/XD300-24_68HighlightsAResearchCntAugHumanIntellect",
          title: "Engelbart’s 1968 demo, 2",
          width: 320,
          height: 240,
          left: xOffset[3] + 400,
          top: 10 + yOffset * 4,
          sideTrips: ["annotation52"],
        },
        {
          id: "annotation52",
          type: "video",
          url: "https://archive.org/embed/XD300-25_68HighlightsAResearchCntAugHumanIntellect",
          title: "Engelbart’s 1968 demo, 3",
          width: 320,
          height: 240,
          left: xOffset[3] + 800,
          top: 10 + yOffset * 4,
          sideTrips: ["kay5"],
        },
      ],
    },
    {
      id: "walk0",
      title: "Sample Walk 1",
      author: "Dan Visel",
      date: "25 April 2021",
      stops: [
        {
          id: "stop1",
          title: "The start point",
          type: "comment",
          text: "This is the very first stop. It's just this text. Click on another stop, or the NEXT button to go on.",
          isStartPoint: true,
          nextStop: "stop2",
        },
        {
          id: "stop2",
          title: "A video clip",
          type: "video",
          url: "https://archive.org/embed/ssfPPIE1915",
          text: "This is an embedded video clip. It can also have comment data in it, like this.",
          nextStop: "stop3",
          top: 60,
          left: 300,
        },
        {
          id: "stop3",
          type: "comment",
          text: "A stop can be an embedded object (like the video) or it can just be a comment (like this one). We can also embed images and books.",
          nextStop: "stop4",
          top: 300,
          left: 975,
        },
        {
          id: "stop4",
          nextStop: "stop5",
          type: "book",
          title: "A book viewer",
          url: "https://archive.org/embed/encyclopedia-britannica-and-intellectual-tools-of-the-future/page/n7/mode/1up?view=theater&ui=embed",
          text: "This is a book viewer embed. I've done this as 1-up, though it could be done as 2-up. Note that it's going to a specific page.",
          left: 10,
          top: 700,
        },
        {
          id: "stop5",
          type: "comment",
          text: "One thing about these stops – you can drag them around if you don’t like where they are. And because the objects are big, you may have to scroll.",
          nextStop: "stop6",
          left: 1210,
          top: 500,
        },
        {
          id: "stop6",
          title: "An image embed",
          type: "image",
          url: "https://archive.org/embed/mma_nakht_and_family_fishing_and_fowling_tomb_of_nakht_548578",
          nextStop: "stop7",
          width: 200,
          height: 200,
          left: 610,
          top: 650,
        },
        {
          id: "stop7",
          title: "A Wayback Machine embed",
          type: "web",
          url: "https://web.archive.org/web/19961219003318/http://voyagerco.com/projects/",
          text: "Need to figure out a better URL scheme for this!",
          nextStop: "stop8",
          width: 600,
          left: 810,
          top: 800,
        },
        {
          id: "stop8",
          type: "comment",
          text: "This is the last stop!",
          isStopPoint: true,
          left: 1300,
          top: 900,
        },
      ],
    },
    {
      id: "walk1",
      title: "Loop demo",
      author: "Dan Visel",
      date: "25 April 2021",
      stops: [
        {
          id: "stop1",
          type: "comment",
          text: "This walk has a loop in it!",
          title: "Regular Stop 1",
          isStartPoint: true,
          nextStop: "stop2",
          top: 10,
          left: 10,
        },
        {
          id: "stop2",
          title: "Example of embedding audio",
          type: "audio",
          url: "https://archive.org/embed/amateur_cracksman_librivox/amateur_cracksman_01_hornung.mp3",
          nextStop: "stop3",
          height: 30,
          top: 110,
          left: 10,
        },
        {
          id: "stop3",
          title: "Regular Stop 3",
          type: "comment",
          text: "This is stop 3",
          nextStop: "stop4",
          top: 210,
          left: 10,
        },
        {
          id: "stop4",
          title: "Decision point",
          type: "comment",
          text: "This is stop 4. From here you can go two ways.",
          nextStop: "stop5",
          sideTrips: ["stop4-1"],
          top: 310,
          left: 10,
        },
        {
          id: "stop4-1",
          title: "Loop 1",
          type: "comment",
          text: "This is loop stop 1!",
          sideTrips: ["stop4-2"],
          top: 310,
          left: 400,
        },
        {
          id: "stop4-2",
          title: "Loop 2",
          type: "comment",
          text: "This is loop stop 2!",
          sideTrips: ["stop4-3"],
          top: 410,
          left: 400,
        },
        {
          id: "stop4-3",
          title: "Loop 3",
          type: "comment",
          text: "This is loop stop 3!",
          sideTrips: ["stop4-4"],
          top: 510,
          left: 400,
        },
        {
          id: "stop4-4",
          title: "Loop 4",
          type: "comment",
          text: "This is loop stop 4!",
          sideTrips: ["stop4"],
          top: 610,
          left: 400,
        },
        {
          id: "stop5",
          title: "Regular Stop 5",
          type: "comment",
          text: "This is stop 5.",
          nextStop: "stop6",
          top: 410,
          left: 10,
        },
        {
          id: "stop6",
          title: "Regular Stop 6",
          type: "comment",
          text: "This is stop 6.",
          nextStop: "stop7",
          top: 510,
          left: 10,
        },
        {
          id: "stop7",
          type: "comment",
          title: "Regular Stop 7",
          text: "This is stop 7.",
          nextStop: "stop8",
          top: 610,
          left: 10,
        },
        {
          id: "stop8",
          type: "comment",
          title: "Regular Stop 8",
          text: "This is the last stop!",
          isStopPoint: true,
          top: 710,
          left: 10,
        },
      ],
    },
    {
      id: "walk2",
      title: "Software embed demo",
      author: "Dan Visel",
      date: "6 May 2021",
      stops: [
        {
          id: "stop8",
          type: "comment",
          title: "Here's something to try",
          text: "We can also embed software running in an emulator. (Note that if that's too loud, press the space bar to pause it – and ESC to get your pointer back.",
          isStartPoint: true,
        },
        {
          id: "stop2_1",
          title: "The Secret of Monkey Island",
          type: "software",
          url: "https://archive.org/embed/mnkyega",
          top: 10,
          left: 300,
          width: 640,
          height: 480,
        },
      ],
    },
  ],
};

export default walkData;
