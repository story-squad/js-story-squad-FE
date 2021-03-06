import FormButton from './FormButton';
import FormInput from './FormInput';
import List from './List';
import ParentLoadingComponent from './ParentLoadingComponent';
import ChildLoadingComponent from './ChildLoadingComponent';
import Button from './Button';
import Header from './Header';
import UploadDocs from './UploadDocs';
import InstructionsModal from './InstructionsModal';
import EmojiFeedback from './EmojiFeedback';
import EmojiPicker from './EmojiPicker';
import SubmissionViewer from './SubmissionViewer';
import ChildAvatar from './ChildAvatar';
import InfoButton from './InfoButton';
import Footer from './Footer';

// notice we're building out a 'package' of reusables here and exporting them as an object of component properties.
// to use this, simply `import {foo, bar, baz} from '~/path/to/common';`
export {
  FormButton,
  FormInput,
  List,
  ParentLoadingComponent,
  ChildLoadingComponent,
  Button,
  Header,
  UploadDocs,
  InstructionsModal,
  EmojiFeedback,
  EmojiPicker,
  SubmissionViewer,
  ChildAvatar,
  InfoButton,
  Footer,
};
