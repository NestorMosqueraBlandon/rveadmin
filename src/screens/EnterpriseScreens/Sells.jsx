import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  deleteQuotation,
  listQuotations,
} from "../../actions/quotationActions";
import LoadingBox from "../../components/LoadingBox";
import DivisaFormater from "../../components/DivisaFormater";
import swal from "sweetalert";
import { QUOTATION_DELETE_RESET } from "../../constants/quotationConstants";
import { createSell, deleteSell, listSells } from "../../actions/sellActions";
import { SELL_CREATE_RESET, SELL_DELETE_RESET } from "../../constants/sellsConstants";

export default function SellsScreen(props) {
  const [openModal, setOpenModal] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [item, setItem] = useState("");
  const [city, setCity] = useState("");
  const [revenue, setRevenue] = useState(1);
  const [perRevenue, setPerRevenue] = useState(0);

  const sellsList = useSelector((state) => state.sellsList);
  const { loading, sells } = sellsList;

  const sellDelete = useSelector((state) => state.sellDelete);
  const { success: successDelete } = sellDelete;

  const sellCreate = useSelector((state) => state.sellCreate)
  const {loading: loadingCreate, success: successCreate} = sellCreate;

  const dispatch = useDispatch();

  useEffect(() => {

    if(successCreate){
      dispatch({type: SELL_CREATE_RESET})
    }

    if(successDelete){
      dispatch({ type: SELL_DELETE_RESET });
    }

    dispatch(listSells());
  }, [dispatch, props.history, successDelete, successCreate]);

  const deleteHandler = (quotation) => {
    swal("Are you sure to delete " + quotation.clientName + "?", {
      icon: "warning",
      buttons: ["Obviously not", "Do that!"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! " + quotation.clientName + " deleted", {
          icon: "success",
        });
        dispatch({ type: SELL_DELETE_RESET });
        dispatch(deleteSell(quotation._id));
      }
    });
  };

  const detailsHandler = (id) => {
    props.history.push(`/quotation/${id}`);
  };

  const perRev = (revenue * 100) / price;

  console.log(perRev);
  let avg = 0;
  if (!loading && sells.length > 0) {
    avg = sells.reduce((a, c) => a + Number(c.perRevenue) * 1, 0);
    avg = avg / sells.length;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setOpenModal(!openModal);
    setPerRevenue(perRev);
    dispatch(
      createSell({
        clientName: name,
        price,
        revenue,
        perRevenue: perRev,
        item,
        city,
      })
    );
  };

  return (
    <>
      <div className="clean__card">
        <div className="card__header">
          <h2>Sells</h2>
          <div className="buttons">
            <button className="btn" onClick={() => setOpenModal(!openModal)}>
              <div className="title">+ Add Sell</div>
            </button>
          </div>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : (
          <div className="clean__body">
            TOTAL SELL{" "}
            <DivisaFormater
              value={sells.reduce((a, c) => a + Number(c.price) * 1, 0)}
            />
            TOTAL REVENUE{" "}
            <DivisaFormater
              value={sells.reduce((a, c) => a + Number(c.revenue) * 1, 0)}
            />
            TOTAL PERCENTAGE REVENUE {avg.toFixed(2)}%
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
                  <th>#</th>
                  <th>CLIENT</th>
                  <th>TOTAL</th>
                  <th>REVENUE</th>
                  <th>% REVENUE</th>
                  <th>ITEM</th>
                  <th>CITY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {sells.map((quotation, index) => (
                  <tr key={quotation._id} className="table-row">
                    <td>{index}</td>
                    <td>{quotation.clientName}</td>
                    <td>
                      <DivisaFormater value={quotation.price} />
                    </td>
                    <td>
                      <DivisaFormater value={quotation.revenue} />{" "}
                    </td>
                    <td>{quotation.perRevenue.toFixed(2)}%</td>
                    <td>{quotation.item}</td>
                    <td>{quotation.city}</td>

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
      <div className={openModal ? "modal active" : "modal"}>
        <div className="modal__dialog">
          <div className="modal__card">
            <div className="card__header b-line">
              <h2 className="card__title">Add Task</h2>
              <button
                className="card__title btn-icon"
                onClick={() => setOpenModal(!openModal)}
              >
                <i className="bx bxs-x-circle"></i>
              </button>
            </div>
            <div className="card__body">
              <form action="">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Client Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Revenue"
                    value={revenue}
                    onChange={(e) => setRevenue(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="% Revenue"
                    value={perRevenue}
                    readOnly
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Item"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
              </form>
            </div>
            <div className="card__footer">
              <button className="btn" onClick={submitHandler}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
