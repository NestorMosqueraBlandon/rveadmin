import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteQuotation,
  listQuotations,
} from '../../actions/quotationActions';
import LoadingBox from '../../components/LoadingBox';
import DivisaFormater from '../../components/DivisaFormater';
import swal from 'sweetalert';
import { QUOTATION_DELETE_RESET } from '../../constants/quotationConstants';

export default function QuotationsScreen(props) {
  const quotationList = useSelector((state) => state.quotationList);
  const { loading, quotations } = quotationList;

  const quotationDelete = useSelector((state) => state.quotationDelete);
  const { success: successDelete } = quotationDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: QUOTATION_DELETE_RESET });
    dispatch(listQuotations());
  }, [dispatch, props.history, successDelete]);

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
        dispatch({ type: QUOTATION_DELETE_RESET });
        dispatch(deleteQuotation(quotation._id));
      }
    });
  };

  const detailsHandler = (id) => {
    props.history.push(`/quotation/${id}`);
  };

  return (
    <div className="clean__card">
      <div className="card__header">
        <h2>Quotations</h2>
        <div className="buttons">
          <Link to="/quotation" className="btn">
            <div className="title">+ Add Quotation</div>
          </Link>
        </div>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : (
        <div className="clean__body">
          <i className="bx bx-search-alt-2"></i>
          <div className="form-group-icon">
            <input
              type="text"
              className="form-control"
              placeholder="Search a quotation"
            />
          </div>
          <table>
            <thead>
              <tr className="table-header">
                <th>CODE</th>
                <th>CLIENT</th>
                <th>TOTAL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {quotations.map((quotation) => (
                <tr key={quotation._id} className="table-row">
                  <td>{quotation.code}</td>
                  <td>{quotation.clientName}</td>
                  <td>
                    <DivisaFormater value={quotation.price} />
                  </td>
                  {/* <td>{timeago.format(product.createdAt, 'en_US')}</td> */}
                  <td>
                    <button
                      className="btn-icon"
                      onClick={() => detailsHandler(quotation._id)}
                    >
                      <i className="bx bx-task"></i>
                    </button>
                    <button className="btn-icon">
                      <i className="bx bx-pencil"></i>
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => deleteHandler(quotation)}
                    >
                      <i className="bx bx-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
