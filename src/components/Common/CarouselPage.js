import React from "react"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Col } from "reactstrap"

const CarouselPage = () => {
  return (
    <React.Fragment>
      <Col xl={9} className="login-page__carousel">
        <div className="auth-full-bg pt-lg-5 p-4">
          <div className="w-100">
            <div className="bg-overlay"></div>
            <div className="d-flex h-100 flex-column">
              <div className="py-5 px-4 mt-auto">
                <div className="row justify-content-center">
                  <div className="col-lg-7">
                    <div className="text-center">
                      <h4 className="mb-1">
                        <i className="bx bxs-quote-alt-left text-primary h1 align-middle me-3"></i>
                        Logistics Quotes
                      </h4>
                      <div dir="ltr">
                        <Carousel showThumbs={false} className="slider_css" dir="rtl">
                          <div>
                            <div className="item">
                              <div className="py-3">
                                <p className="font-size-16 mb-4">
                                  " You will not find it difficult to prove that battles, campaigns, and even wars have been won or lost primarily because of logistics. "
                              </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                  General Dwight D. Eisenhower
                                </h4>
                                  <p className="font-size-14 mb-0">
                                    - 34th U.S. President
                                </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <div className="item">
                              <div className="py-3">
                                <p className="font-size-16 mb-4">
                                  "Leaders win through logistics. Vision, sure. Strategy, yes. But when you go to war, you need to have both toilet paper and bullets at the right place at the right time. In other words, you must win through superior logistics. "
                              </p>

                                <div>
                                  <h4 className="font-size-16 text-primary">
                                   Tom Peters
                                </h4>
                                  <p className="font-size-14 mb-0">
                                    - American writer
                                </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  )
}
export default CarouselPage
