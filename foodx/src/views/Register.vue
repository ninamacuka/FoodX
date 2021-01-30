<template>
  <div class="register">
    <h1>Register</h1>
    <div class="container">
      <div class="row">
        <div class="col-sm-2"></div>
        <div class="col-sm-9">
          <form>
            <div class="form-group">
              <label for="Email">Email:</label>
              <input type="Email" class="form-control" placeholder="Email" />
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input
                type="password"
                class="form-control"
                placeholder="Password"
              />
            </div>
            <div class="form-group">
              <label for="password2">Confirm Password:</label>
              <input
                type="password"
                class="form-control"
                placeholder="Confirm Password"
              />
            </div>
            <button class="btn btn-primary">Submit</button>
          </form>
        </div>
        <div class="col-sm-2"></div>
      </div>
    </div>
  </div>
</template>