import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import useOnclickOutside from 'react-cool-onclickoutside';
import { SearchBox, Hits } from 'react-instantsearch-dom';
import { useTranslation } from './app-state';
import { createSearchUrl } from './routes';

import { ReactComponent as MagnifyingGlassIcon } from './images/icons/magnifying_glass.svg';
import { ReactComponent as ClearIcon } from './images/icons/ic_clear.svg';

import './SearchBar.scss';

interface SearchBoxProps {
}

export const SearchBar: React.FC<SearchBoxProps> = () => {
  const { t } = useTranslation();
  const [ inputVisible, setInputVisible] = useState(false);
  const [ hitsVisible, setHitsVisible ] = useState(false);
  const [ searchValue, setsSearchValue ] = useState(false);
  const history = useHistory();

  const searchBarRef = useOnclickOutside(() => {
    setHitsVisible(false);
  });

  const handleChange = (event: any) => {
    setsSearchValue(event.target.value)
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setHitsVisible(false);
    const searchUrl = createSearchUrl();
    history.push(searchUrl);
  };

  const handleFocus = () => {
    setHitsVisible(true);
    setInputVisible(true);
  };

  const handleLinkClick = () => {
    setHitsVisible(false);
  };

  const handleInputToggle = () => {
    setInputVisible(!inputVisible);
  };

  const onCancel = () => {
    setInputVisible(false);
  };

  const Hit = ({ hit }: any) => {
    return (
      <Link className="searchbar__hint" to={`/product/${hit.slug}`} onClick={handleLinkClick}>
        <img
          className="searchbar__image"
          src={hit.imgUrl}
          alt=""
        />
        <p className="searchbar__hint-text">{hit.name}</p>
      </Link>
    );
  };

  const translations = {
    placeholder: t('search-here'),
  };

  return (
    <div ref={searchBarRef} className="searchbar">
      <button
        className="searchbar__open"
        onClick={handleInputToggle}
      >
        <MagnifyingGlassIcon />
      </button>
      <div className={`searchbar__input ${inputVisible ? '--show' : ''}`}>
        <SearchBox
          onFocus={handleFocus}
          onChange={handleChange}
          onReset={handleChange}
          searchAsYouType
          onSubmit={handleSubmit}
          submit={<MagnifyingGlassIcon />}
          reset={<ClearIcon />}
          translations={translations}
        />
        <button
          className={`searchbar__close ${searchValue && '--show'}`}
          onClick={onCancel}>
          {t('cancel')}
        </button>
        { hitsVisible &&
          <div className="searchbar__hints">
            <Hits
              hitComponent={Hit}
            />
          </div>
        }
      </div>
    </div>
  );
};
