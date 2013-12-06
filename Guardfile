# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload', :port => '35729', :apply_js_live => false do
  watch(%r{.+\.(html|js|css|py)})
end

guard :shell do
  watch /.*\.coffee$/ do |m|
    `coffee -c #{m[0]}`
  end
end

guard :shell do
  watch('d/sass/screen.sass') { `cd d && compass compile sass/screen.sass` }
end
