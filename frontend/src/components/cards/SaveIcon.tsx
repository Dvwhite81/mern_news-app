import { SyntheticEvent } from 'react';
import SaveFilled from '../../assets/saved-icon-fill.png';
import SaveOutline from '../../assets/saved-icon-outline.png';
import { ArticleType } from '../../utils/types';

interface SaveIconProps {
  item: ArticleType | string;
  isSaved: boolean;
  handleSave: (item: ArticleType | string) => void;
}

const SaveIcon = ({ item, isSaved, handleSave }: SaveIconProps) => {
  console.log('SaveIcon item:', item);

  const handle = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSave(item);
  }

  return isSaved ? (
    <div
      className='save-icon-container'
      onClick={handle}
    >
      <img className='icon save-icon' src={SaveFilled} alt='bookmark icon' />
      <img className='icon save-icon' src={SaveOutline} alt='bookmark icon' />        
    </div>
  ) : (
    <div
      className='save-icon-container'
      onClick={handle}
    >
      <img className='icon save-icon' src={SaveOutline} alt='bookmark icon' />
      <img className='icon save-icon' src={SaveFilled} alt='bookmark icon' />        
    </div>
  );
};

export default SaveIcon;