import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//import { addConvo } from '../actions';

// import Loading from './Loading';

import './landing.css'

class Landing extends React.Component {
  state = {
  }

  render() {
    return (
      <main className="landing-main">
        <header id="nav-header">
          <div className="col-md-12">
            <div className="Logo-1 col-md-3">
              Hey-Bot
              </div>
            <div className="nav-link-group col-md-9">
              <Link to="/signup">Sign Up   </Link>
              <Link to="/signin">   Sign In</Link>
            </div>
          </div>
        </header>

        <header id="banner" className="banner-section">
          <div className="col-md-12">
            <div className="col-md-6" id="description-section">
              <div className="col-md-12 header-text">Conversation Manager within Slack</div>
              <div className="col-md-12 desc-text">Build and manage private conversations</div>
              <button id="buy-now" className="btn-blue col-md-10">
                <Link to="/billing">Buy Now</Link>
              </button>
            </div>
          </div>
          <div className="col-md-12">
          </div>
        </header>

        <section className="section-body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam varius mauris, ut commodo dolor eleifend consectetur. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis vulputate mattis erat eu fringilla. Mauris dapibus tincidunt erat aliquet ornare. Donec bibendum eleifend nunc, eget lobortis sem molestie vitae. Ut at imperdiet eros. Aenean nulla diam, pretium non diam eget, vestibulum pharetra velit. Quisque porttitor risus dui, sit amet iaculis est ullamcorper vel. Vivamus molestie lobortis tincidunt. Nulla viverra mauris mi, et volutpat odio ultricies nec. Nam cursus ante at condimentum gravida. Integer lacus lorem, elementum sit amet porttitor at, dapibus non arcu. Fusce placerat lacinia augue a venenatis. Aliquam euismod sem ut ante imperdiet ultrices. Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Donec ullamcorper in nisi non consequat. Phasellus luctus, elit eu eleifend semper, nunc nisl viverra ligula, vitae varius neque ipsum vitae enim. Duis lobortis sed neque interdum convallis. Fusce vel dignissim elit. Proin nunc neque, congue ac ultricies quis, volutpat nec tortor. Mauris at dolor vitae diam fringilla sagittis. Morbi dapibus nisl nisl, a vestibulum tortor scelerisque sed. Curabitur nec tortor placerat, congue dolor at, tristique sapien. Suspendisse a mauris vitae nunc tempor gravida. Donec accumsan mauris eu enim convallis, in suscipit dolor semper. Maecenas iaculis hendrerit nunc, ut mollis urna feugiat vitae. Sed id nibh at nulla lobortis ullamcorper. Etiam consectetur, risus a facilisis efficitur, tellus tellus consequat elit, vitae condimentum nulla libero in dui. Morbi ultricies et tellus eu eleifend.

Donec lorem risus, volutpat id consectetur ut, bibendum ut lorem. Phasellus placerat ligula eu massa gravida pharetra. Aenean sit amet nisl at lacus rutrum placerat. Fusce id pharetra libero. Aliquam erat volutpat. In placerat lacinia porttitor. Sed vitae diam congue, finibus nisi vitae, iaculis nunc. Donec porttitor eros a lobortis viverra. Morbi ipsum orci, venenatis eget varius et, convallis quis erat. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras placerat sapien lacinia, porta ante id, elementum sapien.

Nullam molestie gravida venenatis. Sed sit amet lacus sed enim posuere dapibus. Nunc porttitor odio at lectus feugiat porta. Etiam facilisis ultricies massa, a aliquam dolor consectetur sed. Nulla lacinia felis et mi euismod efficitur at ut libero. Suspendisse sit amet volutpat metus. Aliquam ullamcorper feugiat ipsum, at tempus lectus feugiat et. Donec elementum sed ante et luctus. Nunc iaculis magna rutrum nunc consequat, ut porta ex interdum. In tellus magna, posuere quis tortor sit amet, feugiat ullamcorper tortor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus non ante non tortor auctor feugiat quis sit amet ipsum. Vivamus accumsan venenatis pulvinar. Vivamus tempus viverra erat, a facilisis magna placerat ac. Duis bibendum non nisi vitae maximus. Nulla in dolor sed sem placerat sodales.

Duis molestie metus eros, eu lobortis enim euismod ultricies. Praesent pharetra ante et urna scelerisque tempor fermentum vel tortor. Sed dui neque, efficitur venenatis facilisis ut, consequat a nibh. Sed ullamcorper, sapien id interdum placerat, urna urna facilisis sapien, in porta lorem mi vitae urna. Nunc vel lectus mattis, efficitur ex sed, fringilla tellus. Duis enim dolor, tempus vel laoreet eget, ornare nec arcu. Nullam efficitur nisl velit, quis fermentum ante accumsan ut. Sed eget lectus sed neque malesuada luctus vitae ac ipsum. Etiam purus risus, ultrices vitae turpis ultrices, tempus efficitur odio. Mauris sodales tincidunt pulvinar. Aliquam at quam vestibulum, ultricies quam id, porttitor sapien. Fusce vitae ligula ligula. Aliquam erat volutpat. Ut placerat vestibulum ornare. Proin at euismod turpis.
        </section>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps, {})(Landing);