class AddExternalToCourseNavs < ActiveRecord::Migration[5.2]
  def up
    add_column :course_navs, :external, :boolean, default: false
    add_column :course_navs, :url, :string
    Course.all.each do |course|
      next if course.course_navs.any?
      course.generate_nav_links
    end
  end

  def down
    remove_column :course_navs, :external
    remove_column :course_navs, :url
  end
end
