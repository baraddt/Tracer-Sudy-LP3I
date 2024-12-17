export default function () {
    return (
        <div class="col-xxl-6">
            <div class="card">
                <div class="card-header align-items-center d-flex">
                    <h4 class="card-title mb-0 flex-grow-1">Vertically Centered Modal</h4>
                    <div class="flex-shrink-0">
                        <div class="form-check form-switch form-switch-right form-switch-md">
                            <label for="vertically-centered" class="form-label text-muted">Show Code</label>
                            <input class="form-check-input code-switcher" type="checkbox" id="vertically-centered"></input>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <p class="text-muted">Use <code>modal-dialog-centered</code> class to show vertically center the modal.</p>
                    <div class="live-preview">
                        <div>
                            <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target=".bs-example-modal-center">Center Modal</button>
                            <div class="modal fade bs-example-modal-center" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-dialog-centered">
                                    <div class="modal-content">
                                        <div class="modal-body text-center p-5">
                                            <lord-icon src="https://cdn.lordicon.com/hrqwmuhr.json" trigger="loop" colors="primary:#121331,secondary:#08a88a" style="width:120px;height:120px">
                                            </lord-icon>
                                            <div class="mt-4">
                                                <h4 class="mb-3">Oops something went wrong!</h4>
                                                <p class="text-muted mb-4"> The transfer was not successfully received by us. the email of the recipient wasn't correct.</p>
                                                <div class="hstack gap-2 justify-content-center">
                                                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                                                    <a href="javascript:void(0);" class="btn btn-danger">Try Again</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="d-none code-view">
                        <pre class="language-markup">
                            <code>&lt;!-- Vertically Centered --&gt;
                                &lt;div class=&quot;modal-dialog modal-dialog-centered&quot;&gt;
                                ...
                                &lt;/div&gt;</code></pre>
                    </div>
                </div>
            </div>
        </div>
    )
}