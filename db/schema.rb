# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_28_210140) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "assignments", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "grading_group_id"
    t.string "title"
    t.text "description"
    t.datetime "due_date"
    t.float "points"
    t.boolean "published", default: false
    t.string "submission_type"
    t.string "grade_type"
    t.datetime "unlocks_at"
    t.datetime "locks_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_assignments_on_course_id"
    t.index ["grading_group_id"], name: "index_assignments_on_grading_group_id"
  end

  create_table "attendances", force: :cascade do |t|
    t.boolean "present"
    t.boolean "tardy"
    t.time "tardy_time"
    t.text "reason"
    t.boolean "excused"
    t.boolean "absent"
    t.string "date"
    t.float "total_attendance"
    t.string "badge"
    t.bigint "enrollment_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["enrollment_id"], name: "index_attendances_on_enrollment_id"
  end

  create_table "course_files", force: :cascade do |t|
    t.string "url"
    t.boolean "published", default: false
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_course_files_on_course_id"
  end

  create_table "course_navs", force: :cascade do |t|
    t.bigint "course_id"
    t.string "name"
    t.boolean "visible", default: true
    t.integer "priority"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.boolean "external", default: false
    t.string "url"
    t.index ["course_id"], name: "index_course_navs_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.string "time_zone"
    t.string "department"
    t.datetime "starts"
    t.datetime "ends"
    t.boolean "lock_after_end", default: false
    t.boolean "lock_before_start", default: false
    t.json "course_options"
    t.json "feature_flags"
    t.string "course_home"
    t.boolean "published", default: false
    t.boolean "concluded", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "enrollments", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "course_id"
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "grading_groups", force: :cascade do |t|
    t.string "name"
    t.float "weight"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_grading_groups_on_course_id"
  end

  create_table "group_memberships", force: :cascade do |t|
    t.bigint "enrollment_id"
    t.bigint "group_id"
    t.boolean "group_leader"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["enrollment_id"], name: "index_group_memberships_on_enrollment_id"
    t.index ["group_id"], name: "index_group_memberships_on_group_id"
  end

  create_table "groups", force: :cascade do |t|
    t.string "name"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_groups_on_course_id"
  end

  create_table "questions", force: :cascade do |t|
    t.bigint "quiz_id"
    t.string "answer_type"
    t.float "points"
    t.text "body"
    t.json "question_data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["quiz_id"], name: "index_questions_on_quiz_id"
  end

  create_table "quizzes", force: :cascade do |t|
    t.bigint "course_id"
    t.bigint "grading_group_id"
    t.string "name"
    t.string "quiz_type"
    t.float "points"
    t.boolean "multiple_attempts", default: false
    t.boolean "shuffle", default: false
    t.boolean "published", default: false
    t.datetime "available_from"
    t.datetime "available_until"
    t.json "quiz_settings"
    t.time "time_limit"
    t.datetime "due_date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_quizzes_on_course_id"
    t.index ["grading_group_id"], name: "index_quizzes_on_grading_group_id"
  end

  create_table "unit_items", force: :cascade do |t|
    t.bigint "unit_id"
    t.string "item_type"
    t.string "item_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["unit_id"], name: "index_unit_items_on_unit_id"
  end

  create_table "units", force: :cascade do |t|
    t.string "name"
    t.integer "position"
    t.bigint "course_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_units_on_course_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.string "phone"
    t.boolean "is_admin", default: false
    t.string "homepage", default: "/courses"
    t.text "bio"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "wikis", force: :cascade do |t|
    t.bigint "course_id"
    t.boolean "pinned", default: false
    t.boolean "published", default: false
    t.boolean "public", default: false
    t.datetime "publish_at"
    t.string "wiki_type"
    t.string "title"
    t.text "body"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_wikis_on_course_id"
  end

  add_foreign_key "assignments", "courses"
  add_foreign_key "assignments", "grading_groups"
  add_foreign_key "attendances", "enrollments"
  add_foreign_key "course_files", "courses"
  add_foreign_key "course_navs", "courses"
  add_foreign_key "enrollments", "courses"
  add_foreign_key "enrollments", "users"
  add_foreign_key "grading_groups", "courses"
  add_foreign_key "group_memberships", "enrollments"
  add_foreign_key "group_memberships", "groups"
  add_foreign_key "groups", "courses"
  add_foreign_key "questions", "quizzes"
  add_foreign_key "quizzes", "courses"
  add_foreign_key "quizzes", "grading_groups"
  add_foreign_key "unit_items", "units"
  add_foreign_key "units", "courses"
  add_foreign_key "wikis", "courses"
end
