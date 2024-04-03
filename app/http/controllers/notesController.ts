import Note from "../../models/note";

type NotesControllerType = {
    fetchNotes: (req: any, res: any) => void;
    getNote: (req: any, res: any) => void;
    createNote: (req: any, res: any) => void;
    updateNote: (req: any, res: any) => void;
    deleteNote: (req: any, res: any) => void;
};

class NotesController implements NotesControllerType {
    fetchNotes = async (req: any, res: any) => {
        try {
            const notes = await Note.find();
            res.json(notes);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    };

    getNote = async (req: any, res: any) => {
        const { id } = req.params;

        try {
            const note = await Note
                .findById(id)
                .exec();

            res.json(note);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    };

    createNote = async (req: any, res: any) => {
        const { title, content } = req.body;

        try {
            const note = await Note.create({ title, content });
            res.json(note);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    };

    updateNote = async (req: any, res: any) => {
        const { id } = req.params;
        const { title, content } = req.body;

        try {
            const note = await Note
                .findByIdAndUpdate(id, {
                    title
                    , content
                }, { new: true })
                .exec();

            res.json(note);
        } catch (err) {
            res.status(400).json({ error: err });
        }
    };

    deleteNote = async (req: any, res: any) => {
        const { id } = req.params;

        try {
            const note = await Note
                .findByIdAndDelete(id)
                .exec();

            res.json({ message: "Note deleted" });
        } catch (err) {
            res.status(400).json({ error: err });
        }
    };
}

export default new NotesController();
