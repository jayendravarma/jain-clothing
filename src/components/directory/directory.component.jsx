import React, {Component} from 'react';
import { connect } from 'react-redux';
import { selectDirectorySection } from '../../redux/directory/directory.selectors'
import { createStructuredSelector } from 'reselect';

import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';

class Directory extends Component {
   
    render() {

        return(
            <div className='directory-menu'>
                {this.props.sections.map(({id, ...otherSectionProps}) => (
                    <MenuItem key={id}  {...otherSectionProps} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySection
})

export default connect(mapStateToProps)(Directory);

