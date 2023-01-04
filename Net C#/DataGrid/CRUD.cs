void get(){
    using(Edtities db = new Entities()){
        datagridView.DataSource = db.User.ToList<User>();
    }
}

void insert(){
    User a = new User()
    a.name = "name"
    a.password = "qq"
    using(Entities db = new Entities()){
    	db.User.Add(a);
    	db.SaveChanges();
    }
}

void update(User targetUser,String name){
    using(Entities db = new Entities()){
    	targetUser.name = name
    	db.Entry(targetUser).State = EntityState.Modified;
    	db.SaveChanges()
    }
}

void remove(User targetUser){
    using(Entities db = new Entities()){
    	if(db.Entry(targetUser).State == EntityState.Detache)
    		db.User.attch(targetUser)
    	db.User.Remove(targetUser);
    	db.SaveChanges();
    }
}

void initDataGridViewJoinTable()
{
  using(session1Entities db = new session1Entities())
  {
      if (comboBox1.SelectedIndex == 0)
      {
          dataGridView1.DataSource =
					(
					from p in db.Users
					join o in db.Offices on p.OfficeID equals o.ID
					join r in db.Roles on p.RoleID equals r.ID
					Order By p.StudentName Descending / Ascending
          select new
              {
                  Name = p.FirstName,
                  LastName = p.LastName,
                  Age = DateTime.Today.Year - p.Birthdate.Value.Year,
                  UserRole = r.Title,
                  EmailAddress = p.Email,
                  Office = o.Title,
                  Active = p.Active
              }
						).ToList();
      }
      else
      {
          dataGridView1.DataSource =
					(from p in db.Users
					join o in db.Offices on p.OfficeID equals o.ID
					join r in db.Roles on p.RoleID equals r.ID
					where p.OfficeID == comboBox1.SelectedIndex
					select new
		      {
		          Name = p.FirstName,
		          LastName = p.LastName,
		          Age = p.Birthdate,
		          UserRole = r.Title,
		          EmailAddress = p.Email,
		          Office = o.Title,
		          Active = p.Active
		      }).ToList();
		 }
  }
