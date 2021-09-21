import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteQuotation,
  detailsQuotation,
  sendEmail,
} from '../../actions/quotationActions';
import DivisaFormater from '../../components/DivisaFormater';
import LoadingBox from '../../components/LoadingBox';
import {
  QUOTATION_DELETE_RESET,
  QUOTATION_DETAILS_RESET,
} from '../../constants/quotationConstants';
import swal from 'sweetalert';
import axios from 'axios';

export default function QuotationsDetailsScreen(props) {
  const quotationId = props.match.params.id;

  const quotationDetails = useSelector((state) => state.quotationDetails);
  const { loading, quotation } = quotationDetails;

  const quotationDelete = useSelector((state) => state.quotationDelete);
  const { success: successDelete } = quotationDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: QUOTATION_DELETE_RESET });
    if (!quotation) {
      dispatch({ type: QUOTATION_DETAILS_RESET });
      dispatch(detailsQuotation(quotationId));
    }
  }, [quotation, dispatch, quotationId, props.history, successDelete]);

  const sendmail = (email) => {
    console.log('entro');
    sendEmail(email);
  };
  const deleteHandler = (quotation) => {
    swal('Are you sure to delete ' + quotation.code + '?', {
      icon: 'warning',
      buttons: ['Obviously not', 'Do that!'],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal('Poof! ' + quotation.code + ' deleted', {
          icon: 'success',
        });
        dispatch(deleteQuotation(quotationId));
        props.history.push('/quotations');
      }
    });
  };
  return (
    <div className="clean__card">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <>
          <div className="card__header">
            <h2># {quotation.code}</h2>
            <div className="buttons">
              <Link to="/quotation" className="btn">
                <div className="title">Preview</div>
              </Link>
            </div>
          </div>

          <div className="flex flex-center">
            <div className="data-array">
              <div className="title">
                <h2>Quotations Details</h2>
              </div>
              <div className="content">
                <div className="flex start">
                  <div className="flex-col">
                    <p className="mini-title">Customer Name</p>
                    <p className="mini-data">{quotation.clientName}</p>
                  </div>
                  <div className="flex-col rigth ">
                    <p className="mini-title">Date</p>
                    <p className="mini-data">
                      {quotation.createdAt.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <div className="flex start">
                  <div className="flex-col mt-2">
                    <p className="mini-title">Code</p>
                    <p className="mini-data">#{quotation.code}</p>
                  </div>
                  <div className="flex-col rigth mt-2">
                    <p className="mini-title">Notes</p>
                    <p className="mini-data max-width note">
                      {quotation.note}{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="data-array">
              <div className="title">
                <h2>Send Notifications</h2>
              </div>
              <div className="data-email">
                <select name="" id="" className="form-control">
                  <option value="">Quotation Created</option>
                  <option value="">Payment Received</option>
                </select>
                <button
                  className="btn"
                  onClick={() => sendmail('yunsde18@gmail.com')}
                >
                  <i className="bx bx-mail-send"></i> Send Email
                </button>
              </div>
              <div className="data-options">
                <button>
                  <i className="bx bxs-download"></i> Download (PDF){' '}
                </button>
                <button onClick={() => deleteHandler(quotation)}>
                  <i className="bx bxs-trash"></i> Delete{' '}
                </button>
              </div>
            </div>
          </div>

          <div className="data-array max-wid flex-center">
            <div className="title">
              <h2>Line Items</h2>
            </div>
            <div className="content">
              <table>
                <tr>
                  <th>ITEM</th>
                  <th>QUANTITY</th>
                  <th>TOTAL</th>
                </tr>

                <tbody>
                  {quotation.items.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>
                        <DivisaFormater value={item.price}></DivisaFormater>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="data-footer">
              <h2 className="mini-data">Total: </h2>
              <p>
                {' '}
                <DivisaFormater value={quotation.price}></DivisaFormater>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
